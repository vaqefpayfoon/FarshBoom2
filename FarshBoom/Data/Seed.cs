using System.Linq;
using FarshBoom.Models;
using Microsoft.EntityFrameworkCore;

namespace FarshBoom.Data
{    
    public class Seed
    {
        private readonly DataContext _context;
        public DbSet<User> dbSet;
        public Seed(DataContext context)
        {
            _context = context;
            this.dbSet = context.Set<User>();
        }

        public void SeedUsers()
        {
            if (!this.dbSet.Any())
            {
                User user = new User();

                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);
                user.Username = "Administrator";
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();
                this.dbSet.Add(user);
                _context.SaveChanges();
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}