using FiservReactApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FiservReactApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuoteController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Quote> Get()
        {
            using (var context = new FiservDemoDBContext())
            {
                return context.Quotes.ToList();
            }
        }
    }
}
