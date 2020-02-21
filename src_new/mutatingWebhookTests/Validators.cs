using System;
using Xunit;
using mutatingWebhookWeb.Validators;
using System.Reflection.Metadata;
using Microsoft.Extensions.Logging;
using mutatingWebhookWeb.Controllers;
using Microsoft.VisualStudio.TestPlatform.ObjectModel.Engine;

namespace mutatingWebhookTests
{
    public class ValidatorTests
    {
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void Constructor(dynamic doc)
        {
            if (doc == null)
            {
                Assert.Throws<ArgumentNullException>(() =>
                {
                    return new Validator(doc, null);
                });
            }
            else
            {
                Validator validator = new Validator(doc, null);
                Assert.NotNull(validator.InitLogger());
            }
        }
    }
}
