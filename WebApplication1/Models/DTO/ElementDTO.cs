using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models.DTO
{
    public class ElementDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public int type { get; set; }
        public int role { get; set; }
        public int system { get; set; }
        public string comment { get; set; }
        
    }
}