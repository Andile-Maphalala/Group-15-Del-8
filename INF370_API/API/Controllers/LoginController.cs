using INF370_API.Models;
using Nexmo.Api;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Drawing.Imaging;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
namespace INF370_API.Controllers
{
    public class LoginController : ApiController
    {
        INF370Entities db = new INF370Entities();
        //[HttpPost]
        //[Route("InsertLoginDetails")]
        //public IHttpActionResult PostLogin(USER data)
        //{
        //INF370Entities6 db = new INF370Entities6();
        //    db.Configuration.ProxyCreationEnabled = false;

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {
        //        db.USERs.Add(data);
        //        db.SaveChanges();
        //    }
  


        //    return Ok(data);
        //}

        //public see if user exists
        //function to determine if Username already exists (used when registering new clients and employees)
        [Route("api/Login/doesUserExist/{usrName}")]
        [HttpGet]
        public string doesUserExist(string usrName)
        {
            INF370Entities db = new INF370Entities();

            foreach (USER usr in db.USERs)
            {
                if (usr.USERNAME == usrName)
                {
                    return "true";
                }
            }
            return "false";
        }


        [Route("api/Login/ClientLogin")]
        [HttpPost]
        public dynamic ClientLogin([FromBody] USER usr)
        {
            //check if user exists
            USER checkUserExist = db.USERs.Where(usrw => usrw.USERNAME == usr.USERNAME).FirstOrDefault();
            if (checkUserExist == null)
            {
                dynamic retEmptyUser = new ExpandoObject();
                retEmptyUser.Message = "Invalid User!";
                return retEmptyUser;
            }

            var hash = GenerateHash(ApplySomeSalt(usr.PASSWORD));
            USER usrr = db.USERs.Where(usrw => usrw.USERNAME == usr.USERNAME && usrw.PASSWORD == hash)
                             .Include(zz => zz.USERTYPE)

                             .FirstOrDefault();
            if (usrr != null && usrr.USERTYPEID==2)
            {
               CLIENT clientDetails = db.CLIENTs.Where(zz => zz.USERID == usrr.USERID).FirstOrDefault();
                var hasApplied = db.RENTALAPPLICATIONs.Where(cc => cc.CLIENTID == clientDetails.CLIENTID &&cc.RENTALAPPLICATIONSTATUSID!=1).ToList();

                
                dynamic iUser = new ExpandoObject();
                iUser.ClientID = clientDetails.CLIENTID;
                iUser.UserID = clientDetails.USERID;
                iUser.username = usrr.USERNAME;
                iUser.ClientName = clientDetails.NAME;
                iUser.ClientSurname = clientDetails.SURNAME;
                iUser.ClientCellNumber = clientDetails.PHONENUMBER;
                iUser.ClientEmail = clientDetails.EMAIL;
                iUser.DOB = clientDetails.DATE_OF_BIRTH;
                iUser.verified = clientDetails.verified;

                if (hasApplied.Count()>0)
                {
                    iUser.hasApplied = true;
                }
                else
                {
                    iUser.hasApplied = false;
                }
                
                //add new columns for verification


                return iUser;
            }
            else
            {
                dynamic User = new ExpandoObject();
                User.Message = "Invalid Password!";
                return User;
            }
        }

        [Route("api/Login/VerifyResetOTP")]
        [HttpPost]
        public bool VerifyResetOTP(dynamic dataX)
        {
            try
            {
                string usr = dataX.usrn;
                string entOTP = dataX.otp;
                USER user1 = db.USERs.Where(k => k.USERNAME == usr).FirstOrDefault();
                if (user1.RESETOTP == entOTP)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        [Route("api/Login/SetNewPass")]
        [HttpPost]
        public bool SetNewPass(dynamic pss)
        {
            try
            {
                INF370Entities db11 = new INF370Entities();
                string usr = pss.usrn;
                USER user = db11.USERs.Where(k => k.USERNAME == usr).FirstOrDefault();

                if (user != null)
                {
                    var hash = GenerateHash(ApplySomeSalt(pss.pssw.Value));
                    string newP = hash;
                    user.PASSWORD = newP;
                    user.UserPasswordChangeRequest = false;
                    //user.UserPassword = pss.pssw;

                    db11.Entry(user).State = EntityState.Modified;
                    db11.SaveChanges();

                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch
            {
                return false;
            }
        }

        [Route("api/Login/RequestPasswordReset/{usrn}")]
        [HttpPost]
        public bool RequestPasswordReset(string usrn)
        {
            try
            {
                USER usr = db.USERs.Where(x => x.USERNAME == usrn).FirstOrDefault();
                if (usr != null)
                {
                    //string otpString = "";
                    //MailMessage mail = new MailMessage();
                    //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    //mail.From = new MailAddress("t4596334@gmail.com");
                    //CLIENT getEmail = db.CLIENTs.Where(z => z.USERID == usr.USERID).FirstOrDefault();
                    //string addressTo = getEmail.EMAIL;
                    //mail.To.Add(addressTo);
                    //mail.Subject = "Your OTP for you Reset Password ";
                    //if (usr.UserPasswordChangeRequest == false)
                    //{
                    //    Random random = new Random();
                    //    otpString = random.Next(100000, 999999).ToString();
                    //    setOTP(usrn, otpString);
                    //}
                    //else
                    //{
                    //    otpString = usr.RESETOTP;
                    //}
                    //USER usr2 = db.USERs.Where(x => x.USERNAME == usrn).FirstOrDefault();
                    //string bod = "Your OTP is: " + otpString;
                    //mail.Body = bod;

                    //SmtpServer.Port = 587;
                    //SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    //SmtpServer.UseDefaultCredentials = false;
                    //SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    //SmtpServer.EnableSsl = true;

                    //SmtpServer.Send(mail);













                    //SMS


                    





                    string otpString = "";
                    //MailMessage mail = new MailMessage();
                    //SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    //mail.From = new MailAddress("t4596334@gmail.com");
                    CLIENT getEmail = db.CLIENTs.Where(z => z.USERID == usr.USERID).FirstOrDefault();
                    string addressTo = getEmail.PHONENUMBER;
                    //mail.To.Add(addressTo);
                    //mail.Subject = "Your OTP for you Reset Password ";
                    if (usr.UserPasswordChangeRequest == false)
                    {
                        Random random = new Random();
                        otpString = random.Next(100000, 999999).ToString();
                        setOTP(usrn, otpString);
                    }
                    else
                    {
                        otpString = usr.RESETOTP;
                    }
                    USER usr2 = db.USERs.Where(x => x.USERNAME == usrn).FirstOrDefault();


                    string bod = "Your OTP is: " + otpString;

                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                                                | SecurityProtocolType.Tls11
                                                | SecurityProtocolType.Tls12
                                                | SecurityProtocolType.Ssl3;
                    //var client = new RestClient("https://http-api.d7networks.com/send?username=mipl8508&password=5ac7Woxa&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=This is the sample content sent to test & to = +270825249706");client.Timeout = -1;
                    //var request = new RestRequest(Method.POST);
                    //request.AlwaysMultipartFormData = true;
                    //IRestResponse response = client.Execute(request);
                    //Console.WriteLine(response.Content);


                    //var client = new Client(creds: new Nexmo.Api.Request.Credentials
                    //{
                    //    ApiKey = "13c8e77b",
                    //    ApiSecret = "dzi7GWODBViOZWz0"
                    //});
                    //var results = client.SMS.Send(request: new SMS.SMSRequest
                    //{
                    //    from = "Inturbidus",
                    //    to = "27" + getEmail.PHONENUMBER.ToString(),
                    //    text = "Inturbidus \n\nYour One-Time-Pin to reset your password is " + otpString
                    //});

                    const string accountSid = "ACab19837e4d1898574d3849a76b00079f";
                    const string authToken = "a6365cef2e2faf0272be963684e8fb50";

                    TwilioClient.Init(accountSid, authToken);
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                                                | SecurityProtocolType.Tls11
                                                | SecurityProtocolType.Tls12
                                                | SecurityProtocolType.Ssl3;

                    var number = "+27" + getEmail.PHONENUMBER.ToString();

                    var message = MessageResource.Create(
                        body: "Inturbidus \n\nYour One-Time-Pin to reset your password is " + otpString,
                        from: new Twilio.Types.PhoneNumber("+12055966186"),

                        to: new Twilio.Types.PhoneNumber(number)
                    );

                    // Console.WriteLine(message.Sid);

                    //mail.Body = bod;

                    //SmtpServer.Port = 587;
                    //SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    //SmtpServer.UseDefaultCredentials = false;
                    //SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    //SmtpServer.EnableSsl = true;

                    //SmtpServer.Send(mail);
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {

                throw ex;
                //return false;
            }

        }

        private bool setOTP(string usrn, string OTP)
        {
            try
            {
                INF370Entities db10 = new INF370Entities();
                USER usr = db10.USERs.Where(y => y.USERNAME == usrn).FirstOrDefault();
                usr.RESETOTP = OTP;
                usr.UserPasswordChangeRequest = true;
                db10.Entry(usr).State = EntityState.Modified;
                db10.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }

        // ------------------- HASING OF PASSWORD --------------------------------------
        public static string ApplySomeSalt(string input)
        {
            return input + "tepszgjoowiwccuvckqinnimxxjbbmukxompumnmyugjnwehrnldjsdjygjo";
        }

        public static string GenerateHash(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

    }

    }
    
