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
    public class KeyValueController : ControllerBase
    {
        private IGenericRepository<KeyValue> _repo;
        private IMapper _mapper;
        public KeyValueController(IGenericRepository<KeyValue> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpPost("saveKeyValue")]
        public async Task<IActionResult> saveKeyValue(KeyValue model)
        {
            var item = await _repo.GetAsync(woak => woak.Value == model.Value);
            var savedItem = item.FirstOrDefault();
            savedItem.Title = model.Title;
            await _repo.UpdateAsync(savedItem);            

            return Ok();
        }
        [HttpGet("getKeyValues")]
        public async Task<IActionResult> getKeyValues() 
        {        
            var allPages = await _repo.GetAllAsync();
            //IEnumerable<GoodDto> goods = _mapper.Map<IEnumerable<GoodDto>>(AllGoods);
            return Ok(allPages);
        }      
    }
}