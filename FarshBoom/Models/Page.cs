namespace FarshBoom.Models
{
    public class Page : BaseEntity
    {
        
    }
    public class PageContent : BaseEntity
    {
        public int PageId { get; set; }
        public Page Page { get; set; }
        public string Passage { get; set; }
        public string ImageUrl { get; set; }
    }
}