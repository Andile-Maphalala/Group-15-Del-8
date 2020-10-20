using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Results;

namespace INF370_API.Models
{



    public class APIErrorHandler : IExceptionHandler
    {
        public Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            var customObject = new
            {
                Message = "Oops! Sorry! Something went wrong." +
                      "Please contact support@iqsolutions.com so we can try to fix it."
            };


            //var json = "[" + customObject + "]";
            //{
            //customObject.Message = new { Message = context.Exception.Message },
            //customObject.Status =
            //     customObject.Data = "";
            //};

            //Necessary to return Json

            var jsonType = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            jsonType.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

            var response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, customObject, jsonType);
            var response1 = context.Request.CreateResponse(HttpStatusCode.BadRequest, customObject, jsonType);

            if (response.ReasonPhrase == "InternalServerError")
            {
                context.Result = new ResponseMessageResult(response);

            }
            else
            if (response1.ReasonPhrase == "Bad Request")
            {
                context.Result = new ResponseMessageResult(response1);

            }

            return Task.FromResult(0);
        }
    }

}