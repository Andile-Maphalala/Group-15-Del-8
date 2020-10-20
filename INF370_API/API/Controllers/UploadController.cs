using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web;
using System.IO;
using System.Net.Http.Headers;
using System.Dynamic;
using System.Net.Mail;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Apply")]
    public class UploadController : ApiController
    {
        INF370Entities db = new INF370Entities();

        [HttpPost]
        [Route("AddFileDetails")]
        public dynamic AddFile()
        {
            string result = "";
            try
            {
                INF370Entities objEntity = new INF370Entities();
                DOCUMENT objFile = new DOCUMENT();











                RENTALAPPLICATION application = new RENTALAPPLICATION();


                string fileName = null;
                string fileName1 = null;
                string fileName2 = null;
                var httpRequest = HttpContext.Current.Request;
              

               var IDENTITYDOCUMENT = httpRequest.Files["IDENTITYDOCUMENT"];

                var PAYSLIP = httpRequest.Files["PAYSLIP"];

                var BURSARYLETTER = httpRequest.Files["BURSARYLETTER"];

                //rental application
                //var StartDate =Convert.ToDateTime( httpRequest["PREFERREDDATE"]);
                var StartDate=Convert.ToDateTime(httpRequest.Form["PREFERREDDATE"]).Date;
                var ClientID =Convert.ToInt32( httpRequest["CLIENTID"]);
                var PropertyID = Convert.ToInt32(httpRequest["PROPERTYID"]);
                var existing = db.RENTALAPPLICATIONs.Where(jj => jj.CLIENTID == ClientID && jj.PROPERTYID == PropertyID && jj.RENTALAPPLICATIONSTATUSID == 1).FirstOrDefault();
                var existingAgreement = db.RENTAL_AGREEMENT.Where(jj => jj.CLIENTID == ClientID && jj.PROPERTYID == PropertyID && jj.RENTALENDDATE > DateTime.Today).FirstOrDefault();

                if (existing != null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid = "false";
                    return setInvalid;

                }
                else if(existingAgreement!=null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid = "active";
                    return setInvalid;

                }
                else {
                try
                {
                    application.CLIENTID = ClientID;
                    application.APPLICATIONDATE = DateTime.Today;
                    application.PROPERTYID = PropertyID;
                    application.RENTALAPPLICATIONSTATUSID = 1;
                    application.PREFERREDSTARTDATE = StartDate;

                }
                catch (Exception)
                {

                    return null;

                }

                try
                {
                    db.RENTALAPPLICATIONs.Add(application);
                    db.SaveChanges();





                    if (IDENTITYDOCUMENT != null)
                    {
                        fileName = new String(Path.GetFileNameWithoutExtension(IDENTITYDOCUMENT.FileName).Take(10).ToArray()).Replace(" ", "-");
                        fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(IDENTITYDOCUMENT.FileName);
                        var filePath = HttpContext.Current.Server.MapPath("~/Files/" + fileName);
                        IDENTITYDOCUMENT.SaveAs(filePath);
                    }

                    if (PAYSLIP != null)
                    {
                        fileName1 = new String(Path.GetFileNameWithoutExtension(PAYSLIP.FileName).Take(10).ToArray()).Replace(" ", "-");
                        fileName1 = fileName1 + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(PAYSLIP.FileName);
                        var filePath = HttpContext.Current.Server.MapPath("~/Files/" + fileName1);
                        PAYSLIP.SaveAs(filePath);
                    }
                    if (BURSARYLETTER != null)
                    {
                        fileName2 = new String(Path.GetFileNameWithoutExtension(BURSARYLETTER.FileName).Take(10).ToArray()).Replace(" ", "-");
                        fileName2 = fileName2 + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(BURSARYLETTER.FileName);
                        var filePath = HttpContext.Current.Server.MapPath("~/Files/" + fileName2);
                        BURSARYLETTER.SaveAs(filePath);
                    }
                    objFile.IDENTITYDOCUMENT = fileName;
                    objFile.PAYSLIP = fileName1;
                    objFile.BURSARYLETTER = fileName2;
                    int value = int.Parse(db.RENTALAPPLICATIONs
                          .OrderByDescending(p => p.RENTALAPPLICATIONID)
                          .Select(r => r.RENTALAPPLICATIONID)
                          .First().ToString());
                    objFile.RENTALAPPLICATIONID = value;
                    objEntity.DOCUMENTs.Add(objFile);
                    int i = objEntity.SaveChanges();
                    if (i > 0)
                    {
                        result = "File uploaded sucessfully";
                    }
                    else
                    {
                        result = "File uploaded failed";
                    }

                  
                    var admin = db.EMPLOYEEs.Where(kk => kk.EMPLOYEETYPEID == 9).FirstOrDefault();

                    //send email 

                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(admin.EMAIL.ToString());
                    mail.Subject = "New Rental Application ";
                    mail.Body = "Good day " + admin.NAME + " " + admin.SURNAME + "\n\nThere is a new rental application,Application Number:"+ value +" that has to be reviewed,please have a look at it.\n\nThank you";

                    SmtpServer.Port = 587;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    SmtpServer.EnableSsl = true;

                    SmtpServer.Send(mail);


                }
                catch (Exception)
                {

                    return null;

                }

                }
            }
            catch (Exception)
            {
                return null;

            }
            return Ok(result);


        }

        //public int getCreatedRentalApplicationID()
        //{

        //    var toReturn = db..Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

        //    return toReturn;
        //}
    }
}

//        [HttpGet]
//        [Route("GetFile")]
//        //download file api
//        public HttpResponseMessage GetFile(string docFile)
//        {

//            //Create HTTP Response.
//            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

//            //Set the File Path.
//            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/") + docFile + ".docx";

//            //Check whether File exists.
//            if (!File.Exists(filePath))
//            {
//                //Throw 404 (Not Found) exception if File not found.
//                response.StatusCode = HttpStatusCode.NotFound;
//                response.ReasonPhrase = string.Format("File not found: {0} .", docFile);
//                throw new HttpResponseException(response);
//            }

//            //Read the File into a Byte Array.
//            byte[] bytes = File.ReadAllBytes(filePath);

//            //Set the Response Content.
//            response.Content = new ByteArrayContent(bytes);

//            //Set the Response Content Length.
//            response.Content.Headers.ContentLength = bytes.LongLength;

//            //Set the Content Disposition Header Value and FileName.
//            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
//            response.Content.Headers.ContentDisposition.FileName = docFile + ".docx";

//            //Set the File Content Type.
//            response.Content.Headers.ContentType = new MediaTypeHeaderValue(MimeMapping.GetMimeMapping(docFile + ".docx"));
//            return response;
//        }

//        [HttpGet]
//        [Route("GetFileDetails")]
//        public IHttpActionResult GetFile()
//        {
//            var url = HttpContext.Current.Request.Url;
//            IEnumerable<FileDetailsVM> lstFile = new List<FileDetailsVM>();
//            try
//            {
//                INF370Entities4 objEntity = new INF370Entities4();

//                lstFile = objEntity.FileDetails.Select(a => new FileDetailsVM
//                {
//                    FileId = a.FileId,
//                    UserName = a.UserName,
//                    Image = url.Scheme + "://" + url.Host + ":" + url.Port + "/Files/" + a.Image,
//                    DocFile = a.DocFile,
//                    ImageName = a.Image
//                }).ToList();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//            return Ok(lstFile);
//        }

//        [HttpGet]
//        [Route("GetImage")]
//        //download Image file api
//        public HttpResponseMessage GetImage(string image)
//        {

//            //Create HTTP Response.
//            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

//            //Set the File Path.
//            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/") + image + ".PNG";

//            //Check whether File exists.
//            if (!File.Exists(filePath))
//            {
//                //Throw 404 (Not Found) exception if File not found.
//                response.StatusCode = HttpStatusCode.NotFound;
//                response.ReasonPhrase = string.Format("File not found: {0} .", image);
//                throw new HttpResponseException(response);
//            }

//            //Read the File into a Byte Array.
//            byte[] bytes = File.ReadAllBytes(filePath);

//            //Set the Response Content.
//            response.Content = new ByteArrayContent(bytes);

//            //Set the Response Content Length.
//            response.Content.Headers.ContentLength = bytes.LongLength;

//            //Set the Content Disposition Header Value and FileName.
//            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
//            response.Content.Headers.ContentDisposition.FileName = image + ".PNG";

//            //Set the File Content Type.
//            response.Content.Headers.ContentType = new MediaTypeHeaderValue(MimeMapping.GetMimeMapping(image + ".PNG"));
//            return response;
//        }
//    }
//}
