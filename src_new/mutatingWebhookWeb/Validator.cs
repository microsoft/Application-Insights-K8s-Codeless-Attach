using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using mutatingWebhookWeb.Controllers;
using Newtonsoft.Json;

namespace mutatingWebhookWeb.Validators
{
    public class Validator
    {
        //holds the document to validate 
        private dynamic document;
        // logger
        private ILogger<MutatingWebhookController> logger;
        private IDisposable scope;
        public Validator(dynamic document, ILogger<MutatingWebhookController> logger)
        {
            this.document = document ?? throw new ArgumentNullException("document");
            this.logger = logger ?? InitLogger();
            this.scope = this.logger.BeginScope<string>("Validator");
            this.logger.LogInformation("Constructing validator");
        }

        ~Validator()
        {
            this.logger.LogInformation("Validator done");
            scope.Dispose();
        }

        public void Validate()
        {
            if (this.document == null)
            {

            }
        }

        protected internal ILogger<MutatingWebhookController> InitLogger()
        {
            ILoggerFactory loggerFactory = LoggerFactory.Create(builder => {
                builder
                .AddFilter("Validator",LogLevel.Debug)
                .AddConsole()
                .SetMinimumLevel(LogLevel.Debug);
            });

            return loggerFactory.CreateLogger<MutatingWebhookController>();
        }
    }

}