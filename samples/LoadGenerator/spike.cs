using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;

namespace LoadGenerator
{
    public static class spike
    {
        [FunctionName("spike")]
        public static async Task Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            HttpClient httpClient = new HttpClient();
            var result = await httpClient.GetAsync("http://13.66.156.119/spike");
            Console.WriteLine(result.ToString());
            return;
        }
    }
}
