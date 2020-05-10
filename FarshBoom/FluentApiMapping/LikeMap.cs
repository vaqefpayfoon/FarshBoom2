using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using FarshBoom.Models;

namespace FarshBoom.FluentApiMapping
{
    public class LikeMap : Extensions.DbEntityConfiguration<Like>
    {
        public override void Configure(EntityTypeBuilder<Like> t)
        {
            t.ToTable("Likes");
            t.HasKey(x => x.Id);
            t.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}