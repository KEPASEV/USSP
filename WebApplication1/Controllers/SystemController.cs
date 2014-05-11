﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class SystemController : ApiController
    {

        SystemModels[] systems = new SystemModels[] 
        { 
            new SystemModels { id = 1, name = "Tomato Soup", goal = "Groceries"}, 
            new SystemModels { id = 2, name = "Yo-yo", goal = "Toys" }, 
            new SystemModels { id = 3, name = "Hammer", goal = "Hardware"} 
        };

        // GET api/system
        public IEnumerable<SystemModels> Get()
        {
            return systems;
        }

        // GET api/system/5
        public SystemModels Get(int id)
        {
            return systems.First(el => el.id==id);
        }

        // POST api/system
        public void Post([FromBody]SystemModels value)
        {
        }

        // PUT api/system/5
        public void Put(int id, [FromBody]SystemModels value)
        {
            
        }

        // DELETE api/system/5
        public void Delete(int id)
        {            
            for (int i = 0; i < systems.Length; i++) {
                if (systems[i].id == id) {
                    systems[i] = null;
                }
                
            }            
        }
    }
}
