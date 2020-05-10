using Microsoft.EntityFrameworkCore;
using FarshBoom.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using FarshBoom.Data;
using FarshBoom.Helpers;

namespace FarshBoom.Repositories.Generic
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        public DataContext context;
        public DbSet<TEntity> dbSet;
        string errorMessage = string.Empty;
        public GenericRepository(DataContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }
        public async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }
        public async Task<TEntity> GetFirstAsync(
            Expression<Func<TEntity, bool>> filter = null,
            string includeProperties = "")
        {
            TEntity query = null;

            if (filter != null)
            {
                if(string.IsNullOrEmpty(includeProperties))
                    query = await dbSet.FirstOrDefaultAsync(filter);
                else
                    query = await dbSet.Include(includeProperties).FirstOrDefaultAsync(filter);
            }
            return query;

        }
        public IQueryable<TEntity> GetAsQueryable(
           Expression<Func<TEntity, bool>> filter = null,
           string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return query;
        }

        public async Task<TEntity> GetByIDAsync(object id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(string includeProperties = "")
        {
            if (!string.IsNullOrEmpty(includeProperties))
            {
                IQueryable<TEntity> query = dbSet;
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' },
                 StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                } 
                return query;               
            }                
            else
                return await dbSet.ToListAsync();

        }
        public async Task<PagedList<TEntity>> GetAllAsync(UserParams userParams, string includeProperties = "")
        {
            IQueryable<TEntity> results = dbSet.OrderByDescending(woak => woak.Id);
            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeProperty in includeProperties.Split(new char[] { ',' },
                 StringSplitOptions.RemoveEmptyEntries))
                {
                    results = results.Include(includeProperty);
                }              
            }                
            else
            {
                results = dbSet.AsQueryable();
            }
                
            return await PagedList<TEntity>.CreateAsync(results, userParams.PageNumber, userParams.PageSize);

        }
        public IEnumerable<TEntity> GetAll(string includeProperties = "")
        {
            if (!string.IsNullOrEmpty(includeProperties))
                return dbSet.Include(includeProperties).ToList();
            else
                return dbSet.ToList();
        }

        public async Task<int> InsertAsync(TEntity entity)
        {
            
            try
            {
                entity.AddedDate = DateTime.Now;
                dbSet.Add(entity);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public int Insert(TEntity entity)
        {
            try
            {
                entity.AddedDate = DateTime.Now;

                dbSet.Add(entity);
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> RemoveAsync(object id)
        {
            try
            {
                TEntity entityToDelete = dbSet.Find(id);
                if (context.Entry(entityToDelete).State == EntityState.Detached)
                {
                    dbSet.Attach(entityToDelete);
                }
                dbSet.Remove(entityToDelete);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }
        public async Task<int> DeleteAllAsync(
             Expression<Func<TEntity, bool>> filter = null)
        {
            try
            {
                var itemsToBeDeleted = dbSet.Where(filter);
                dbSet.RemoveRange(itemsToBeDeleted);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> UpdateAsync(TEntity entityToUpdate)
        {
            try
            {
                entityToUpdate.LastModifiedDate = DateTime.Now;
                context.Update(entityToUpdate);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }

        public async Task<int> InsertAllAsync(List<TEntity> entities)
        {
            try
            {
                dbSet.AddRange(entities);
                return await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                return -1;
            }
        }
    }
}
