using System.Net;
using System.Web.Configuration;
using Twilio;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace NF370_API.Models
{
    public class RestClient
    {
        private readonly ITwilioRestClient _client;
        private readonly string _accountSid = WebConfigurationManager.AppSettings["ACab19837e4d1898574d3849a76b00079f"];
        private readonly string _authToken = WebConfigurationManager.AppSettings["a6365cef2e2faf0272be963684e8fb50"];
        private readonly string _twilioNumber = WebConfigurationManager.AppSettings["+12055966186"];


        public RestClient()
        {
            _client = new TwilioRestClient(_accountSid, _authToken);
        }

        public RestClient(ITwilioRestClient client)
        {
            _client = client;
        }

        public void SendSmsMessage(string phoneNumber, string message)
        {
            const string accountSid = "ACab19837e4d1898574d3849a76b00079f";
            const string authToken = "a6365cef2e2faf0272be963684e8fb50";

            TwilioClient.Init(accountSid, authToken);
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                                        | SecurityProtocolType.Tls11
                                        | SecurityProtocolType.Tls12
                                        | SecurityProtocolType.Ssl3;

            var Message = MessageResource.Create(
                        body: message,
                        from: new Twilio.Types.PhoneNumber("+12055966186"),

                        to: new Twilio.Types.PhoneNumber(phoneNumber)
                    );

      
        }
    }
}