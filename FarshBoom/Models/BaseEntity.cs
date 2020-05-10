using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FarshBoom.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public DateTime? AddedDate { get; set; }        
    }
    public class Size : BaseEntity { }
    public class Type : BaseEntity { }
    public class Brand : BaseEntity { }
    public class Plan : BaseEntity { }
    public class Color : BaseEntity { }
    public class Assessment : BaseEntity { }
    public class Porz : BaseEntity { }
    public class Chele : BaseEntity { }
    public class Raj : BaseEntity { }

}
