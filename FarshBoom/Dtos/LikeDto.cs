namespace FarshBoom.Dtos
{
    public class LikeDto
    {
        public int Id { get; set; }
        public int Srl { get; set; }
        public string Title { get; set; }
        public string Passage { get; set; }
        public int UserId { get; set; }
        public string User { get; set; }
        public string PersianDate { get; set; }
    }
}