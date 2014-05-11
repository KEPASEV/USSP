using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class SystemModels
    {
        public int id { get; set; }
        public string name { get; set; }
        public string goal { get; set; }
        public UserInfoViewModel user { get; set; }   
    }
       
}