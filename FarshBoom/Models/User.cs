using System;
using System.Collections.Generic;

namespace FarshBoom.Models
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public RoleType RoleType { get; set; }
        public ICollection<Good> Goods { get; set; }
    }
}