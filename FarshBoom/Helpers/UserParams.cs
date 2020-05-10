namespace FarshBoom.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public bool OrderBy { get; set; }
        public int? UserId { get; set; }
        public int? SizeId { get; set; }
        public int? TypeId { get; set; }
        public int? BrandId { get; set; }
        public int? ColorId { get; set; }
        public int? PorzId { get; set; }
    }
}