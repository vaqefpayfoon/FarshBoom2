using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using FarshBoom.Models;

namespace FarshBoom.FluentApiMapping
{
    public class GoodMap : Extensions.DbEntityConfiguration<Good>
    {
        public override void Configure(EntityTypeBuilder<Good> t)
        {
            t.ToTable("Goods");
            t.HasKey(x => x.Id);
            t.HasOne(x => x.Size).WithMany().HasForeignKey(x => x.SizeId).OnDelete(DeleteBehavior.Restrict);         
            t.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Type).WithMany().HasForeignKey(f => f.TypeId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Brand).WithMany().HasForeignKey(f => f.BrandId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Plan).WithMany().HasForeignKey(f => f.PlanId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Color).WithMany().HasForeignKey(f => f.ColorId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Color2).WithMany().HasForeignKey(f => f.ColorId2).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Assessment).WithMany().HasForeignKey(f => f.AssessmentId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Porz).WithMany().HasForeignKey(f => f.PorzId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Chele).WithMany().HasForeignKey(f => f.CheleId).OnDelete(DeleteBehavior.Restrict);
            t.HasOne(x => x.Raj).WithMany().HasForeignKey(f => f.RajId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}