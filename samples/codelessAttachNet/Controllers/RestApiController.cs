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
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Microsoft.WindowsAzure.Storage.Auth;
using System.Security.Cryptography.X509Certificates;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Net;

namespace codelessAttachNet.Controllers
{
    [ApiController]
    [Route("/")]
    public class RestApiController : ControllerBase
    {
        private readonly ILogger<RestApiController> _logger;
        private string dbConnString;

        public RestApiController(ILogger<RestApiController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task PostAsync()
        {
            HttpStatusCode response = HttpStatusCode.OK;
            try
            {
                HttpContext.Response.StatusCode = 200;
                var request = this.HttpContext.Request;
                var reader = new StreamReader(request.Body);
                var json = await reader.ReadToEndAsync();
                dynamic parsedJson = JsonConvert.DeserializeObject(json);

                var rand = new Random();

                if (parsedJson["DelayMs"] != null
                    && parsedJson.DelayMs > 0)
                {
                    await Task.Delay(TimeSpan.FromMilliseconds((double)parsedJson.DelayMs));
                }

                if (parsedJson["FailureChance"] != null
                    && (double)parsedJson.FailureChance > rand.NextDouble())
                {
                    throw new Exception();
                }

                if (parsedJson["SubsequentCalls"] != null)
                {
                    foreach (dynamic call in parsedJson.SubsequentCalls)
                    {
                        if (call["Uri"] != null && call.Uri != null && ((String)call.Uri).StartsWith("database"))
                        {
                            HttpStatusCode localResponse = await SubsequentCallDatabase(call.Params);
                            if ((int)localResponse > 299)
                            {
                                response = localResponse;
                            }

                        }
                        else if (call["Uri"] != null && call.Uri != null && ((String)call.Uri).StartsWith("http"))
                        {
                            HttpStatusCode localResponse = await SubsequentCallHttp((String)call.Uri);
                            if ((int)localResponse > 299)
                            {
                                response = localResponse;
                            }
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                response = HttpStatusCode.InternalServerError;
            }
            HttpContext.Response.StatusCode = (int)response;
            return;
        }

        private async Task PopulateValues()
        {
            this.dbConnString = Environment.GetEnvironmentVariable("AZURESTORAGE_CONNECTION");
            if (String.IsNullOrEmpty(this.dbConnString))
            {
                this.dbConnString = await this.GetCreds("DBConnString");
            }
        }

        private async Task<HttpStatusCode> SubsequentCallHttp(String uri)
        {
            _logger.LogInformation("Calling URL {0}", uri);
            var request = new HttpRequestMessage(HttpMethod.Get, uri);
            var client = new HttpClient();
            var response = await client.SendAsync(request);
            var content = "";
            _logger.LogInformation("{0} responded with: {1}", uri, response.StatusCode);
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }
            return response.StatusCode;
        }

        private async Task<HttpStatusCode> SubsequentCallDatabase(dynamic parameters)
        {
            await this.PopulateValues();
            _logger.LogInformation("Calling table storage");
            CloudStorageAccount account = CloudStorageAccount.Parse(this.dbConnString);
            CloudTableClient serviceClient = account.CreateCloudTableClient();
            EntryTable entry = new EntryTable(parameters);
            CloudTable table = serviceClient.GetTableReference("table1");
            TableOperation op = TableOperation.InsertOrReplace(entry);
            TableResult result = await table.ExecuteAsync(op);

            _logger.LogInformation("table called");
            return (HttpStatusCode)result.HttpStatusCode;
        }

        public async Task<string> GetCreds(string secretName)
        {
            string result = "";

            _logger.LogInformation("getting secret {0}", secretName);

            try
            {
                return Environment.GetEnvironmentVariable("AZURESTORAGE_CONNECTION");
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
            }

            return result;
        }

        // This method fetches a token from Azure Active Directory, which can then be provided to Azure Key Vault to authenticate
        public async Task<string> GetAccessTokenAsync()
        {
            var azureServiceTokenProvider = new AzureServiceTokenProvider();
            string accessToken = await azureServiceTokenProvider.GetAccessTokenAsync("https://vault.azure.net");
            return accessToken;
        }

    }

    public class EntryTable : TableEntity
    {
        public EntryTable(dynamic parameters)
        {
            if (parameters["PartitionKey"] != null && parameters["RowKey"] != null)
            {
                this.PartitionKey = (String)parameters.PartitionKey;
                this.RowKey = (String)parameters.RowKey;
            }
            
            this.CustomKey = (String)parameters.CustomKey;
        }

        public string CustomKey { get; set; }

        public override string ToString()
        {
            return String.Format("{0} {1} {2}", this.PartitionKey, this.RowKey, this.CustomKey);
        }
    }
}

