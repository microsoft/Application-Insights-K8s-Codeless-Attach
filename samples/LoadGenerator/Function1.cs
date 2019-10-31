using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace LoadGenerator
{
    // user load genetrator
    public static class Function1
    {
        [FunctionName("Function1")]
        public static async Task Run([TimerTrigger("* */5 * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            String jsonString = "{\"DelayMs\":\"100\",\"RetryCount\":1,\"FailureChance\":0.0,\"SubsequentCalls\":[{\"Uri\": \"http://correlation.southcentralus.cloudapp.azure.com:8086/api/query/GetString?fromAks=true&delayInMS=1&backendNumRetries=3&dataStoreDelayInMS=1&dataStoreFailureRatio=0.0&dataStoreTextFailureRatio=0.00\",\"Params\":\"RedisParams BlobParams\"},{\"Uri\":\"database\",\"Params\":{\"PartitionKey\":\"a\",\"RowKey\":\"productid\",\"CustomKey\":\"value\"}}]}";
            HttpClient httpClient = new HttpClient();
            var result = await httpClient.PostAsync("http://52.151.23.55/", new StringContent(jsonString, Encoding.UTF8, "application/json"));
            Console.WriteLine(result.ToString());
            return ;
        }
    }
}
