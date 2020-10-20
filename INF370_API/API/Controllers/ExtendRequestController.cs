using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Net.Mail;
using System.Dynamic;

namespace INF370_API.Controllers
{ [RoutePrefix("api/Extend")]
    public class ExtendRequestController : ApiController
    {
        [HttpGet]
        [Route("GetProperties/{ClientID}")]
        public List<dynamic> GetProperties(string ClientID)
        {
            var clientid = Convert.ToInt32(ClientID);
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetProperties(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.CLIENTID == clientid).ToList());

        }
        private List<dynamic> GetProperties(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT Jb in forbros)
            {

                dynamic dynamicjob = new System.Dynamic.ExpandoObject();

                var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.PropertyID = Jb.PROPERTYID;
                dynamicjob.RefferenceNo = Jb.REFERENCE_NO;
                dynamicjob.RentalAgreementID = Jb.RENTALAGREEMENTID;
                dynamicjobs.Add(dynamicjob);


            }
            return dynamicjobs;
        }

        [HttpGet]
        [Route("GetAmountDue/{ReferenceNo}")]
        public dynamic GetAmount(string ReferenceNo)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            int refe = Convert.ToInt32(ReferenceNo);
            return GetAmount(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.RENTALAGREEMENTID == refe).FirstOrDefault());

        }
        private dynamic GetAmount(RENTAL_AGREEMENT forbros)
        {
            dynamic dynamicjob = new ExpandoObject();
            dynamicjob = forbros.RENTALENDDATE ;
            return dynamicjob;
        }



        [HttpPost]
        [Route("SendExtendEmail")]
        public HttpResponseMessage SendTerminateEmail(Email email)
        {

            //add try catch when done


            INF370Entities db = new INF370Entities();
            var clientID = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.CLIENTID).FirstOrDefault();
            var referenceNo= db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.REFERENCE_NO).FirstOrDefault();
            var theClient = db.CLIENTs.Find(clientID);

            RENTAL_AGREEMENT rnt = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).FirstOrDefault();
            rnt.ExtendRentalDate = email.ExtensionDate;
            db.RENTAL_AGREEMENT.Add(rnt);
            db.SaveChanges();

            //send email with verification OTP
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("t4596334@gmail.com");
            mail.To.Add("inturbidus653@gmail.com");
            mail.Subject = "Extension Request From: " + theClient.NAME + " " + theClient.SURNAME;
            mail.Body = "Rental Agreement Reference Number "+ referenceNo +" \n Client Details \n Client ID : " + theClient.CLIENTID + " \n Name: " + theClient.NAME + " " + theClient.SURNAME + "Extension Request Details \n Extension Date : " + email.ExtensionDate;

            SmtpServer.Port = 587;
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);


            return Request.CreateResponse(HttpStatusCode.Created);
            //-------------
        }
        private List<dynamic> SendTerminateEmail(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT Jb in forbros)
            {

                dynamic dynamicjob = new System.Dynamic.ExpandoObject();

                var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.PropertyID = Jb.PROPERTYID;
                dynamicjob.RefferenceNo = Jb.REFERENCE_NO;
                dynamicjobs.Add(dynamicjob);


            }
            return dynamicjobs;
        }


    }
}
