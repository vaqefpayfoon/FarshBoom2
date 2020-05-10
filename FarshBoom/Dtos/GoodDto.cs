using System;
using FarshBoom.Models;
using Microsoft.AspNetCore.Http;

namespace FarshBoom.Dtos
{
    public class GoodDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public string User { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int TypeId { get; set; }
        public string Type { get; set; }
        public int BrandId { get; set; }
        public string Brand { get; set; }
        public int PlanId { get; set; }
        public string Plan { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public int ColorId2 { get; set; }
        public string Color2 { get; set; }
        public int AssessmentId { get; set; }
        public string Assessment { get; set; }
        public int PorzId { get; set; }
        public string Porz { get; set; }
        public int CheleId { get; set; }
        public string Chele { get; set; }
        public int RajId { get; set; }
        public string Raj { get; set; }
        public string FarshboomCode { get; set; }
        public string ProviderCode { get; set; }
        public int Lenght { get; set; }
        public int Width { get; set; }
        public bool Slider { get; set; }
        public string ImageUrl { get; set; }
        public DateTime AddedDate { get; set; }
    }
    public class GoodInsertDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }
        public int SizeId { get; set; }
        public int TypeId { get; set; }
        public int BrandId { get; set; }
        public int PlanId { get; set; }
        public int ColorId { get; set; }
        public int ColorId2 { get; set; }
        public int AssessmentId { get; set; }
        public int PorzId { get; set; }
        public int CheleId { get; set; }
        public int RajId { get; set; }
        public string FarshboomCode { get; set; }
        public string ProviderCode { get; set; }
        public int Lenght { get; set; }
        public int Width { get; set; }
        public bool Slider { get; set; }
        public string ImageUrl { get; set; }      
    }
    public class UpdatePhotoGoodDto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public IFormFile File { get; set; }
    }
}