namespace FarshBoom.Dtos
{
    public class PageContentDto
    {
        public int PageId { get; set; }        
        public string Page { get; set; }
        public string Title { get; set; }
        public string Passage { get; set; }
        public byte[] Image { get; set; }
        public string ImageUrl { get; set; }
    }
}