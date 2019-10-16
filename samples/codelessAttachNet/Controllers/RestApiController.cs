using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace codelessAttachNet.Controllers
{
    [ApiController]
    [Route("/")]
    public class RestApiController : ControllerBase
    {
        private readonly ILogger<RestApiController> _logger;

        public RestApiController(ILogger<RestApiController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<string> GetAsync()
        {
            try
            {
                HttpContext.Response.StatusCode = 200;
                var request = this.HttpContext.Request;
                var reader = new StreamReader(request.Body);
                var json = await reader.ReadToEndAsync();
                dynamic parsedJson = JsonConvert.DeserializeObject(json);

                var rand = new Random();

                if(parsedJson["DelayMs"] != null 
                    && parsedJson.DelayMs > 0)
                {
                    await Task.Delay(TimeSpan.FromMilliseconds((double)parsedJson.DelayMs));
                }

                if(parsedJson["FailureChance"] != null
                    && (double)parsedJson.FailureChance > rand.NextDouble())
                {
                    throw new Exception();
                }

                if (parsedJson["SubsequentCalls"]!= null)
                {
                    foreach (dynamic call in parsedJson.SubsequentCalls)
                    {
                        if (call["Uri"] != null && call.Uri != null && ((String)call.Uri).StartsWith("http"))
                        {
                            await SubsequentCallHttp((String)call.Uri);
                        }
                        else if (call["Uri"] != null && call.Uri != null && ((String)call.Uri).StartsWith("database"))
                        {
                            await SubsequentCallDatabase(call.Params);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                HttpContext.Response.StatusCode = 500;
            }

            return "ok";
        }

        private async Task<String> SubsequentCallHttp(String uri)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, uri);
            var client = new HttpClient();
            var response = await client.SendAsync(request);
            var content = "";
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }
            return content;
        }

        private async Task<String> SubsequentCallDatabase(dynamic parameters)
        {
            return "DB";
        }
    }
}
