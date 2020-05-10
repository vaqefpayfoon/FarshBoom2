using Microsoft.AspNetCore.Http;

namespace FarshBoom.Dtos
{
    public class SlideDto
    {
        public int Id { get; set; }
        public IFormFile File { get; set; }
        public string ImageUrl { get; set; }
    }
    public class SlideUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Passage { get; set; }
    }
}