using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;


namespace WebApplication1.Controllers
{
    [Authorize]
    public class SystemController : ApiController
    {
        Entities db = new Entities();

        // GET api/system
        public IEnumerable<SystemModels> Get()
        {
            string userId = GetUserId();

            var userSystems = from systems in db.Systems
                              where systems.User == userId
                              select systems;
            List<SystemModels> systemList= new List<SystemModels>();

            foreach (Systems s in userSystems) {
                SystemModels newSys = new SystemModels();
                newSys.id = s.Id;
                newSys.name = s.Name;
                newSys.goal = s.Goal;
                systemList.Add(newSys);
            }

            return systemList.ToArray();
        }

        private string GetUserId(){
           var user = from users in db.AspNetUsers
                         where users.UserName == User.Identity.Name
                         select users;
           return user.FirstOrDefault().Id;
        }

        private AspNetUsers GetUser()
        {
            var user = from users in db.AspNetUsers
                       where users.UserName == User.Identity.Name
                       select users;
            return user.FirstOrDefault();
        }

        // GET api/system/5
        public SystemModels Get(int id)
        {
            Systems system = db.Systems.FirstOrDefault(el => el.Id == id);
            SystemModels systemModels = new SystemModels();
            systemModels.id = system.Id;
            systemModels.name = system.Name;
            systemModels.goal = system.Goal;
            return systemModels;
        }

        // POST api/system
        public void Post([FromBody]Systems value)
        {
            try {
 
                value.User = GetUserId();
                db.Systems.Add(value);
                db.Entry(value).State = EntityState.Added;
                db.SaveChanges();
 
            }catch(Exception ex){
            
            }
        }
        
        // PUT api/system/5
        public void Put(int id, [FromBody]SystemModels value)
        {
            Systems system = db.Systems.FirstOrDefault( el => el.Id==id);
            system.Name = value.name;
            system.Goal = value.goal;
            db.Entry(system).State = EntityState.Modified;
            db.SaveChanges();
        }

        // DELETE api/system/5
        public void Delete(int id)
        {
            Systems system = db.Systems.FirstOrDefault(el => el.Id == id);
            db.Systems.Remove(system);            
            db.Entry(system).State = EntityState.Deleted;
            db.SaveChanges();
        }
    }
}
