using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using mutatingWebhookWeb.Validators;

namespace mutatingWebhookWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MutatingWebhookController : ControllerBase
    {
        private readonly ILogger<MutatingWebhookController> _logger;

        public MutatingWebhookController(ILogger<MutatingWebhookController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()//(string data)
        {
            return "dada2";
        }

        [HttpPost]
        public async Task<string> Post()
        {
            HttpStatusCode response = HttpStatusCode.OK;
            try
            {
                HttpContext.Response.StatusCode = 200;
                var request = this.HttpContext.Request;
                var reader = new StreamReader(request.Body);
                var json = await reader.ReadToEndAsync();
                dynamic parsedJson = JsonConvert.DeserializeObject(json);
                // here be dragons

                Validator validator = new Validator(parsedJson, this._logger);
                
                // pfiu dragons gone
                HttpContext.Response.ContentType = "application/json";
                return JsonConvert.SerializeObject(parsedJson);
            }
            catch (Exception ex)
            {
                response = HttpStatusCode.InternalServerError;
            }
            finally
            {
                HttpContext.Response.StatusCode = (int)response;
            }

            return "";
        }
    }
}
