using System;
using System.ComponentModel.DataAnnotations;
using FarshBoom.Models;

namespace FarshBoom.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        public string Title { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "پسورد بین 4 تا 8 کاراکتر باشد")]
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string RoleType { get; set; }
        
    }
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string RoleType { get; set; }
    }
}