using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Dtos;
using FarshBoom.Helpers;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FarshBoom.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class SlideController : ControllerBase
    {
        private IGenericRepository<Slide> _repo;
        private IMapper _mapper;
        public SlideController(IGenericRepository<Slide> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("{id}/photoUpload")]
        public async Task<IActionResult> PhotoUpload(int id, [FromForm]SlideDto slideDto)
        {
            
            // Slide slide = new Slide();
            // var file = slideDto.File;
            
            // if (file.Length > 0)
            // {                
            //     MemoryStream ms = new MemoryStream();
            //         file.CopyTo(ms);
            //         slide.Image = ms.ToArray();
            //     var result = await _repo.InsertAsync(slide);
            // }
            // return Ok(slide);
            var slideFromRepo = await _repo.GetByIDAsync(id);

            var file = slideDto.File;
            
            if (file.Length > 0)
            {
                string ImageName= id.ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/assets/slide",ImageName);
                //string RelatedPath = Path.Combine("../wwwroot/img", ImageName);
                string RelatedPath = Path.Combine("~/wwwroot/assets/slide", ImageName);
                slideFromRepo.ImageUrl = "/assets/slide" + "/" + ImageName;
                MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    //slideFromRepo.Image = ms.ToArray();
                var result = await _repo.UpdateAsync(slideFromRepo);
                using(var stream = new FileStream(SavePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            return Ok(slideFromRepo);
        }
        [HttpGet("getSlide")]
        public async Task<IActionResult> GetSlide(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            Slide slide;
            if(field.Equals("name"))
                slide = await _repo.GetFirstAsync(woak => woak.Title.Equals(key));
            else
                slide = await _repo.GetFirstAsync(woak => woak.Id == Convert.ToInt32(key));
            
            return Ok(slide);
        }
        [HttpGet("getSlides")]
        public async Task<IActionResult> GetSlides() 
        {        
            var allSlides = await _repo.GetAllAsync();
            return Ok(allSlides);
        }

        [HttpPost("saveSlide")]
        public async Task<IActionResult> SaveUser(Slide model)
        {
            int result = await _repo.InsertAsync(model);
            if(result == -1)
                throw new Exception($"couldn't insert this carpet");

            //var goodToReturn = _mapper.Map<GoodDto>(goodToCreate);

            return Ok(new {id = model.Id});
        }

        [HttpPost("updateSlide")]
        public async Task<IActionResult> UpdateUser(SlideUpdateDto model)
        {
            Slide updatedSlide = await _repo.GetByIDAsync(model.Id);
            _mapper.Map(model, updatedSlide);
            var slide = await _repo.UpdateAsync(updatedSlide);
            if(slide == -1)
                throw new Exception($"Updating pageContent {model.Id} failed on save");
            else
                return Ok(model.Id);
            
        }

        [HttpPost("deleteSlide")]
        public async Task<IActionResult> DeleteSlide(StringModel name) 
        {        
            var slide = await _repo.GetByIDAsync(name.Id);

            var result = await _repo.RemoveAsync(slide.Id);
            if(result != 1)
                throw new Exception($"couldn't delete this slide");
            return Ok();
        }
    }
}