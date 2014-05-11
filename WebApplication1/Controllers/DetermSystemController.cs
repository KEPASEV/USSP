using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    [Authorize]
    
    public class DetermSystemController : Controller
    {
        //
        // GET: /DetermSystem/        
        public ActionResult Index()
        {
            return View();
        }
	}
}