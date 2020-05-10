using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using FarshBoom.Models;

namespace FarshBoom.FluentApiMapping
{
   
    public class SizeMap : Extensions.DbEntityConfiguration<Size>
    {
        public override void Configure(EntityTypeBuilder<Size> t)
        {
            t.ToTable("Sizes");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class TypeMap : Extensions.DbEntityConfiguration<Size>
    {
        public override void Configure(EntityTypeBuilder<Size> t)
        {
            t.ToTable("Sizes");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
        public class BrandMap : Extensions.DbEntityConfiguration<Brand>
    {
        public override void Configure(EntityTypeBuilder<Brand> t)
        {
            t.ToTable("Brands");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class PlanMap : Extensions.DbEntityConfiguration<Plan>
    {
        public override void Configure(EntityTypeBuilder<Plan> t)
        {
            t.ToTable("Plans");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class ColorMap : Extensions.DbEntityConfiguration<Color>
    {
        public override void Configure(EntityTypeBuilder<Color> t)
        {
            t.ToTable("Colors");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class AssessmentMap : Extensions.DbEntityConfiguration<Assessment>
    {
        public override void Configure(EntityTypeBuilder<Assessment> t)
        {
            t.ToTable("Assessments");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class CheleMap : Extensions.DbEntityConfiguration<Chele>
    {
        public override void Configure(EntityTypeBuilder<Chele> t)
        {
            t.ToTable("Cheles");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class PorzMap : Extensions.DbEntityConfiguration<Porz>
    {
        public override void Configure(EntityTypeBuilder<Porz> t)
        {
            t.ToTable("Porzs");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class RajMap : Extensions.DbEntityConfiguration<Raj>
    {
        public override void Configure(EntityTypeBuilder<Raj> t)
        {
            t.ToTable("Rajs");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
    public class KeyValueMap : Extensions.DbEntityConfiguration<KeyValue>
    {
        public override void Configure(EntityTypeBuilder<KeyValue> t)
        {
            t.ToTable("KeyValues");
            t.HasKey(x => x.Id);
            t.Property(x => x.Title).IsRequired();
        }
    }
}
