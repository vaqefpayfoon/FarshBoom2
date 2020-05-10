namespace FarshBoom.Models
{
    public class Like : BaseEntity
    {
        public int Srl { get; set; }
        public string Passage { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}