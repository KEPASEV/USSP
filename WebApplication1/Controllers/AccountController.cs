using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage GetLogin(Account account) { 
            var response = Request.CreateResponse<Account>(HttpStatusCode.Created, account);
            string url = Url.Link("DefaultApi", new { controller="Views", id="Home.html" });
            response.Headers.Location = new Uri(url);
            return response;
        }

    }
}
