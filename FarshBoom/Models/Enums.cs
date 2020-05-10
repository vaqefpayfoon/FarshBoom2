using System.ComponentModel.DataAnnotations;

namespace FarshBoom.Models
{
    public enum RoleType
    {
        [Display(Name = "فرش بوم")]
        Admin,
        [Display(Name = "تامین کنندگان")]
        Provider,
        [Display(Name = "مشتریان")]
        Customer,
    }
    public enum Gender
    {
        [Display(Name = "آقا")]
        Male,
        [Display(Name = "خانم")]
        Female
    }
}