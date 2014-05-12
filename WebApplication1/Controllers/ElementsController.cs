using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models.DTO;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [RoutePrefix("api/Systems/{SystemsId}")]
    public class ElementsController : ApiController
    {
        Entities db = new Entities();

        private static readonly Expression<Func<Elements, ElementDTO>> AsElementDTO =
            x => new ElementDTO
            {
                id = x.Id,
                name = x.Name,
                comment = x.Comment,
                role = x.Role,
                type = x.Type,
                system = x.System               
            };

        [Route("Elements")]
        // GET api/elements
        public IEnumerable<ElementDTO> Get(int SystemsId)
        {
            var elements = from element in db.Elements
                           where element.System == SystemsId
                           select element;


            return elements.Select(AsElementDTO).ToArray();
        }

        // GET api/elements/5
        public string Get(int SystemId ,int id)
        {
            return "value";
        }

        [Route("Elements")]
        // POST api/elements
        public void Post([FromBody]Elements value)
        {
            db.Elements.Add(value);
            db.Entry(value).State = EntityState.Added;
            db.SaveChanges();
        }

        [Route("Elements/{id:int}")]
        // PUT api/elements/5
        public void Put(int SystemsId, int id, [FromBody]Elements value)
        {
            var element = db.Elements.FirstOrDefault(el => el.Id == id && el.System == SystemsId);
            element.Name = value.Name;
            element.Role = value.Role;
            element.Type = value.Type;
            element.Comment = value.Comment;
            db.Entry(element).State = EntityState.Modified;
            db.SaveChanges();
        }

        [Route("Elements/{id:int}")]
        // DELETE api/elements/5
        public void Delete(int SystemsId, int id)
        {
            var element = db.Elements.FirstOrDefault(el => el.Id == id && el.System == SystemsId);
            db.Elements.Remove(element);
            db.Entry(element).State = EntityState.Deleted;
            db.SaveChanges();        
        }
    }
}
