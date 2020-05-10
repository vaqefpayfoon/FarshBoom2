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
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class LikeController : ControllerBase
    {
        private IGenericRepository<Like> _repo;
        private IMapper _mapper;
        public LikeController(IGenericRepository<Like> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("saveLike")]
        public async Task<IActionResult> saveLike(Like model)
        {
            var user = await _repo.GetAsync(woak => woak.UserId == model.UserId && woak.Srl == model.Srl);
            if (user.Any())
                return BadRequest("قبلا نظر شما برای این فرش ثبت شده است");
            if(string.IsNullOrEmpty(model.Title))
                model.Title = string.Empty;
            int result = await _repo.InsertAsync(model);
            if(result == -1)
                throw new Exception($"اشکال در ارسال اطلاعات");

            return Ok(new {id = model.Id});
        }
        [HttpGet("getAllLikes")]
        public async Task<IActionResult> GetAllLikes([FromQuery]UserParams userParams) 
        {        
            PagedList<Like> likes = await _repo.GetAllAsync(userParams, "User");

            IEnumerable<LikeDto> likeDto;
            likeDto = _mapper.Map<IEnumerable<LikeDto>>(likes);          
            
            Response.AddPagination(likes.CurrentPage, likes.PageSize,
                likes.TotalCount, likes.TotalPages);
            return Ok(likeDto);
        }
        [HttpGet("getLike")]
        public async Task<IActionResult> GetGood(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Like like;
            if(field.Equals("name"))
                like = await _repo.GetFirstAsync(woak => woak.Title.Equals(key));
            else
                like = await _repo.GetFirstAsync(woak => woak.Srl == Convert.ToInt32(key));
            LikeDto likeDto = _mapper.Map<LikeDto>(like);
            return Ok(new {likeDto = likeDto});
        }
    }
}