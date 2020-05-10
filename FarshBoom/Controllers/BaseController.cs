using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FarshBoom.Dtos;
using FarshBoom.Helpers;
using FarshBoom.Models;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FarshBoom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IGenericRepository<Size> _repoSize;
        private IGenericRepository<Models.Type> _repoType;
        private IGenericRepository<Brand> _repoBrand;
        private IGenericRepository<Plan> _repoPlan;
        private IGenericRepository<Color> _repoColor;
        private IGenericRepository<Porz> _repoPorz;
        private IGenericRepository<Chele> _repoChele;
        private IGenericRepository<Assessment> _repoAssessment;
        private IGenericRepository<Raj> _repoRaj;
        private IGenericRepository<User> _repoUser;

        private IMapper _mapper;
        public BaseController(IGenericRepository<Size> repoSize, 
            IGenericRepository<Models.Type> repoType,
            IGenericRepository<Brand> repoBrand,
            IGenericRepository<Plan> repoPlan,
            IGenericRepository<Color> repoColor,
            IGenericRepository<Porz> repoPorz,
            IGenericRepository<Chele> repoChele,
            IGenericRepository<Assessment> repoAssessment,
            IGenericRepository<Raj> repoRaj,
            IGenericRepository<User> repoUser,
            IMapper mapper)
        {
            _repoSize = repoSize;
            _repoType = repoType;
            _repoBrand = repoBrand;
            _repoPlan = repoPlan;
            _repoColor = repoColor;
            _repoPorz = repoPorz;
            _repoChele = repoChele;
            _repoAssessment = repoAssessment;
            _repoRaj = repoRaj;
            _repoUser = repoUser;
            _mapper = mapper;
        }

        [HttpGet("getBase")]
        public async Task<IActionResult> GetBase() 
        {        
            IEnumerable<Size> sizes = await _repoSize.GetAllAsync();
            IEnumerable<Models.Type> types = await _repoType.GetAllAsync();
            IEnumerable<Brand> brands = await _repoBrand.GetAllAsync();
            IEnumerable<Plan> plans = await _repoPlan.GetAllAsync();
            IEnumerable<Color> colors = await _repoColor.GetAllAsync();
            IEnumerable<Porz> porzs = await _repoPorz.GetAllAsync();
            IEnumerable<Chele> cheles = await _repoChele.GetAllAsync();
            IEnumerable<Assessment> assessments = await _repoAssessment.GetAllAsync();
            IEnumerable<Raj> rajs = await _repoRaj.GetAllAsync();
            IEnumerable<User> users = await _repoUser.GetAsync(woak => woak.RoleType == RoleType.Provider);
            return Ok(new {
                sizes, types, brands, plans, colors, porzs, cheles, assessments, rajs, users
                });
        }
        [HttpGet("getSliderBase")]
        public async Task<IActionResult> GetSliderBase() 
        {        
            IEnumerable<Size> sizes = await _repoSize.GetAllAsync();
            IEnumerable<Models.Type> types = await _repoType.GetAllAsync();
            IEnumerable<Brand> brands = await _repoBrand.GetAllAsync();
            //IEnumerable<Plan> plans = await _repoPlan.GetAllAsync();
            IEnumerable<Color> colors = await _repoColor.GetAllAsync();
            IEnumerable<Porz> porzs = await _repoPorz.GetAllAsync();
            //IEnumerable<Chele> cheles = await _repoChele.GetAllAsync();
            //IEnumerable<Assessment> assessments = await _repoAssessment.GetAllAsync();
            //IEnumerable<Raj> rajs = await _repoRaj.GetAllAsync();
            //IEnumerable<User> users = await _repoUser.GetAsync(woak => woak.RoleType == RoleType.Provider);
            return Ok(new {
                sizes, types, brands, colors, porzs
                });
        }
    }
}