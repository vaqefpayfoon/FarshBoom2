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
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IGenericRepository<User> _repo;
        private IMapper _mapper;
        public UserController(IGenericRepository<User> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("default")]
        public IActionResult Default()
        {
            return Ok("we got the message");
        }
        [HttpPost("saveUser")]
        public async Task<IActionResult> SaveUser(UserForRegisterDto model)
        {
            model.Username = model.Username.ToLower();
            var user = await _repo.GetAsync(woak => woak.Username.Equals(model.Username));
            if (user.Any())
                return BadRequest("نام کاربری قبلا در سیستم ثبت شده است");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);            

            User userToCreate = _mapper.Map<User>(model);

            userToCreate.PasswordHash = passwordHash;
            userToCreate.PasswordSalt = passwordSalt;

            await _repo.InsertAsync(userToCreate);

            var userToReturn = _mapper.Map<UserForDetailDto>(userToCreate);

            return Ok(new {id = userToCreate.Id});
        }
        [HttpPost("updateUser")]
        public async Task<IActionResult> UpdateUser(UserForDetailDto userForUpdateDto)
        {
            User updatedUser = await _repo.GetByIDAsync(userForUpdateDto.Id);
            _mapper.Map(userForUpdateDto, updatedUser);

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(userForUpdateDto.Password, out passwordHash, out passwordSalt);            


            updatedUser.PasswordHash = passwordHash;
            updatedUser.PasswordSalt = passwordSalt;

            var user = await _repo.UpdateAsync(updatedUser);            
            if(user == -1)
                throw new Exception($"Updating user {userForUpdateDto.Id} failed on save");
            else
                return Ok(userForUpdateDto.Id);
            
        }
        [HttpPost("deleteUser")]
        public async Task<IActionResult> DeleteUser(StringModel name) 
        {        
            var user = await _repo.GetByIDAsync(name.Id);

            await _repo.RemoveAsync(user.Id);
                
            throw new Exception($"couldn't delete this user");
        }
        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser(string key, string field) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            User user;
            if(field.Equals("name"))
                user = await _repo.GetFirstAsync(woak => woak.Username.Equals(key));
            else
                user = await _repo.GetFirstAsync(woak => woak.Id == Convert.ToInt32(key));
            UserForDetailDto userDto = _mapper.Map<UserForDetailDto>(user);
            return Ok(new {userDto = userDto});
        }
        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers() 
        {        
            var allUsers = await _repo.GetAllAsync();
            IEnumerable<UserForDetailDto> users = _mapper.Map<IEnumerable<UserForDetailDto>>(allUsers);
            return Ok(users);
        }
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers([FromQuery]UserParams userParams) 
        {        
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var results = await _repo.GetAllAsync();
            var query = results.AsQueryable();
            PagedList<User> users = await _repo.GetAllAsync(userParams);
            IEnumerable<UserForDetailDto> userDto;
            userDto = _mapper.Map<IEnumerable<UserForDetailDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);
            return Ok(userDto);
        }
        [HttpGet("filteredUsers")]
        public async Task<IActionResult> FilteredUsers(string key) 
        {        
            // var role = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // var identity = (ClaimsPrincipal)System.Threading.Thread.CurrentPrincipal;
            // var name = identity.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            // var sid = identity.Claims.Where(c => c.Type == ClaimTypes.Sid).Select(c => c.Value).SingleOrDefault();
            // var role = identity.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();
            // var er = User.Identities;
             
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault(); 
            //var users = await _repo.GetUsers(key, roles);
            var users = await _repo.GetAllAsync();
            users = users.Where(woak => woak.Username.Contains(key));
            IEnumerable<UserForDetailDto> userDto;
            userDto = _mapper.Map<IEnumerable<UserForDetailDto>>(users);
            //users = users.Where(woak => woak.RoleType == (RoleType)Enum.Parse(typeof(RoleType), roles));
            //IEnumerable<City> CityName = cities.Select(a => new City{Id = a.Id, CityName = a.CityName});
            //IEnumerable<string> userName = users.Select(a => a.Username);
            //string output = JsonConvert.SerializeObject(userName);
            
            string output = JsonConvert.SerializeObject(userDto);
            return Ok(output);
        }
        [HttpGet("getUsernames")]
        public async Task<IActionResult> GetUsernames() 
        {        
            // var role = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // var identity = (ClaimsPrincipal)System.Threading.Thread.CurrentPrincipal;
            // var name = identity.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            // var sid = identity.Claims.Where(c => c.Type == ClaimTypes.Sid).Select(c => c.Value).SingleOrDefault();
            // var role = identity.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();
            // var er = User.Identities;
             
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault(); 
            //var users = await _repo.GetUsers(key, roles);
            var users = await _repo.GetAllAsync();
            //users = users.Where(woak => woak.RoleType == (RoleType)Enum.Parse(typeof(RoleType), roles));
            //IEnumerable<City> CityName = cities.Select(a => new City{Id = a.Id, CityName = a.CityName});
            IEnumerable<string> userName = users.Select(a => a.Username);
            //string output = JsonConvert.SerializeObject(userName);
            
            string output = JsonConvert.SerializeObject(userName);
            return Ok(userName);
        }
        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(UserForLoginDto userForLoginDto)
        {
            var user = await _repo.GetFirstAsync(woak => woak.Username.Equals(userForLoginDto.Username));
            
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(userForLoginDto.Password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _repo.UpdateAsync(user);  

            string message = "password changed successfully";
            return Ok(message);
            
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}