namespace FarshBoom.Models
{
    public class Good : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
        public int TypeId { get; set; }
        public Type Type { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int PlanId { get; set; }
        public Plan Plan { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public int ColorId2 { get; set; }
        public Color Color2 { get; set; }
        public int AssessmentId { get; set; }
        public Assessment Assessment { get; set; }
        public int PorzId { get; set; }
        public Porz Porz { get; set; }
        public int CheleId { get; set; }
        public Chele Chele { get; set; }
        public int RajId { get; set; }
        public Raj Raj { get; set; }
        public string FarshboomCode { get; set; }
        public string ProviderCode { get; set; }
        public int Lenght { get; set; }
        public int Width { get; set; }
        public bool Slider { get; set; } = false;
        public string ImageUrl { get; set; }
    }
}