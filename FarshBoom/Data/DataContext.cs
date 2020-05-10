using FarshBoom.Extensions;
using FarshBoom.FluentApiMapping;
using FarshBoom.Models;
using Microsoft.EntityFrameworkCore;

namespace FarshBoom.Data
{
    public class DataContext : DbContext
    {        
        public DataContext(DbContextOptions<DataContext> option) : base(option) {}
        public DbSet<Good> Goods { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<Chele> Cheles { get; set; }
        public DbSet<Porz> Porzs { get; set; }
        public DbSet<Raj> Rajs { get; set; }
        public DbSet<Page> Pages { get; set; }
        public DbSet<PageContent> PageContents { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<KeyValue> KeyValues { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.Entity<Good>()
            //     .HasOne(u => u.Size)
            //     .WithMany()
            //     .HasForeignKey(u => u.SizeId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Type)
            //     .WithMany()
            //     .HasForeignKey(u => u.TypeId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Brand)
            //     .WithMany()
            //     .HasForeignKey(u => u.BrandId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Plan)
            //     .WithMany()
            //     .HasForeignKey(u => u.PlanId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Color)
            //     .WithMany()
            //     .HasForeignKey(u => u.ColorId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Assessment)
            //     .WithMany()
            //     .HasForeignKey(u => u.AssessmentId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Chele)
            //     .WithMany()
            //     .HasForeignKey(u => u.CheleId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Porz)
            //     .WithMany()
            //     .HasForeignKey(u => u.PorzId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Good>()
            //     .HasOne(u => u.Raj)
            //     .WithMany()
            //     .HasForeignKey(u => u.RajId)
            //     .OnDelete(DeleteBehavior.Restrict);

            //base.OnModelCreating(builder);
            AddConfigurations(builder);
        }
        void AddConfigurations(ModelBuilder builder)
        {
            builder.AddConfiguration(new GoodMap());
            builder.AddConfiguration(new LikeMap());
            builder.AddConfiguration(new SizeMap());
            builder.AddConfiguration(new TypeMap());
            builder.AddConfiguration(new BrandMap());
            builder.AddConfiguration(new PlanMap());
            builder.AddConfiguration(new ColorMap());
            builder.AddConfiguration(new AssessmentMap());
            builder.AddConfiguration(new CheleMap());
            builder.AddConfiguration(new PorzMap());
            builder.AddConfiguration(new RajMap());
            builder.AddConfiguration(new KeyValueMap());
        }
    }
}