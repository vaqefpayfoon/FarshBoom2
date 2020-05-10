using System;
using System.ComponentModel.DataAnnotations;

namespace FarshBoom.Model
{
    public class BaseViewModel
    {
        public int Id { get; set; }
        public DateTime? AddedDate { get; set; }
        public string SystemUserId { get; set; } 
        [Display(Name = "Name")]
        [Required(AllowEmptyStrings = false, ErrorMessageResourceName = "RequiredField", ErrorMessage = "message")]
        public string Title { get; set; }
    }
}