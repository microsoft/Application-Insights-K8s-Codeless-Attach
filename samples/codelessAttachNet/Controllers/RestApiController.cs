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

namespace codelessAttachNet.Controllers
{
    [ApiController]
    [Route("/")]
    public class RestApiController : ControllerBase
    {
        private readonly ILogger<RestApiController> _logger;
        private string dbConnString;
        private string dbKey;

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
                _logger.LogError(ex.ToString());
                HttpContext.Response.StatusCode = 500;
            }

            return "ok";
        }

        private async Task PopulateValues()
        {
            if (String.IsNullOrEmpty(this.dbConnString))
            {
                this.dbConnString = await this.GetCreds("DBConnString");
            }

            if (String.IsNullOrEmpty(this.dbKey))
            {
                this.dbKey = await this.GetCreds("DbKey");
            }
        }

        private async Task<String> SubsequentCallHttp(String uri)
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
            return content;
        }

        private async Task SubsequentCallDatabase(dynamic parameters)
        {
            await this.PopulateValues();
            _logger.LogInformation("Calling blob storage");
            CloudStorageAccount account = CloudStorageAccount.Parse(this.dbConnString);
            CloudBlobClient serviceClient = account.CreateCloudBlobClient();

            // Create container. Name must be lower case.
            var container = serviceClient.GetContainerReference("democontainer");
            container.CreateIfNotExistsAsync().Wait();
            // write a blob to the container
            CloudBlockBlob blob = container.GetBlockBlobReference("codelessDemo.txt");
            var toUpload = (new EntryTable(parameters)).ToString();
            blob.UploadTextAsync(toUpload).Wait();
            _logger.LogInformation("uploaded \"{0}\"", toUpload);
        }

        public async Task<string> GetCreds(string secretName)
        {
            string result = "";

            _logger.LogInformation("getting secret {0}", secretName);

            try
            {
                /* The next four lines of code show you how to use AppAuthentication library to fetch secrets from your key vault */
                AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
                KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
                var secret = await keyVaultClient.GetSecretAsync(String.Format("https://codelessdemo.vault.azure.net/secrets/{0}", secretName))
                            .ConfigureAwait(false);
                result = secret.Value;
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

