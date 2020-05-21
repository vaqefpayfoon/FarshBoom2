using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Dtos;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FarshBoom.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        private IGenericRepository<Page> _repoHeader;
        private IGenericRepository<PageContent> _repo;
        private IMapper _mapper;
        public PageController(IGenericRepository<PageContent> repo, IGenericRepository<Page> repoHeader, IMapper mapper)
        {
            _repo = repo;
            _repoHeader = repoHeader;
            _mapper = mapper;
        }
        [HttpPost("savePageContent")]
        public async Task<IActionResult> SavePageContent(PageContent model)
        {
            //PageContent goodToCreate = _mapper.Map<PageContent>(model);
            int result = await _repo.InsertAsync(model);
            if(result == -1)
                throw new Exception($"couldn't insert this carpet");

            //var goodToReturn = _mapper.Map<GoodDto>(goodToCreate);

            return Ok(new {id = model.Id});
        }
        [HttpPost("updatePageContent")]
        public async Task<IActionResult> UpdatePageContent(PageContent model)
        {
            PageContent updatedPageContent = await _repo.GetByIDAsync(model.Id);
            updatedPageContent.Title = model.Title;
            updatedPageContent.Passage = model.Passage;
            var good = await _repo.UpdateAsync(updatedPageContent);
            if(good == -1)
                throw new Exception($"Updating pageContent {model.Id} failed on save");
            else
                return Ok(model.Id);
            
        }
        [HttpPost("{id}/photoUpdate")]
        [AllowAnonymous]
        public async Task<IActionResult> PhotoUpdate(int id, [FromForm]UpdatePhotoGoodDto photoForCreationDto)
        {
            var pageContentFromRepo = await _repo.GetByIDAsync(id);

            var file = photoForCreationDto.File;
            
            if (file.Length > 0)
            {
                string ImageName= id.ToString() + Path.GetExtension(file.FileName);
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/assets/page",ImageName);
                string getDit = Directory.GetCurrentDirectory();
                string RelatedPath = Path.Combine("~/wwwroot/assets/page", ImageName);
                
                pageContentFromRepo.ImageUrl = "/assets/page" + "/" + ImageName;
                MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    //pageContentFromRepo.Image = ms.ToArray();
                var result = await _repo.UpdateAsync(pageContentFromRepo);
                using(var stream = new FileStream(SavePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            return Ok(pageContentFromRepo);
        }
        [HttpPost("deletePageContent")]
        public async Task<IActionResult> DeleteGood(StringModel name) 
        {        
            var pageContent = await _repo.GetByIDAsync(name.Id);

            await _repo.RemoveAsync(pageContent.Id);
                
            throw new Exception($"couldn't delete this page");
        }
        [HttpGet("getContents")]
        public IActionResult GetContents(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            IEnumerable<PageContent> pageContents;
            if(field.Equals("name"))
                pageContents = _repo.GetAll().Where(woak => woak.Title.Equals(key));
            else
                pageContents = _repo.GetAll().Where(woak => woak.Id == Convert.ToInt32(key));
            //GoodDto goodDto = _mapper.Map<GoodDto>(good);
            return Ok(new {pageContents = pageContents});
        }
        [HttpGet("getPageContent")]
        public async Task<IActionResult> GetPageContent(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            PageContent pageContent;
            if(field.Equals("name"))
                pageContent = await _repo.GetFirstAsync(woak => woak.Title.Equals(key));
            else
                pageContent = await _repo.GetFirstAsync(woak => woak.Id == Convert.ToInt32(key));
            //GoodDto goodDto = _mapper.Map<GoodDto>(good);
            return Ok(new {pageContent = pageContent});
        }
        [HttpGet("getPages")]
        public async Task<IActionResult> GetPages() 
        {        
            var allPages = await _repoHeader.GetAllAsync();
            //IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(allPages);
        }
        [HttpGet("getPageContents")]
        public async Task<IActionResult> GetPageContents() 
        {        
            var allPageContents = await _repo.GetAllAsync();
            //IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(allPageContents);
        }
    }
}