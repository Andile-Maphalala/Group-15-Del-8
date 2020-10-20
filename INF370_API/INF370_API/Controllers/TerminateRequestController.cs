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
{
    [RoutePrefix("api/Terminate")]
    public class TerminateRequestController : ApiController
    {

        INF370Entities abc = new INF370Entities();

        [HttpGet]
        [Route("GetProperties/{ClientID}")]
        public List<dynamic> GetProperties(string ClientID)
        {
            var clientid = Convert.ToInt32(ClientID);
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            var today = DateTime.Today;
            return GetProperties(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.CLIENTID == clientid && zz.RENTALSTATUSID == 1 && zz.AMOUNTDUE == 0 && zz.RENTALENDDATE > today).ToList());

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
                dynamicjob.RENTALENDDATE = Jb.RENTALENDDATE;

                dynamicjobs.Add(dynamicjob);

               
            }
            return dynamicjobs;
        }


        [HttpPut]
        [Route("SendTerminateEmail")]
        public IHttpActionResult PutjobMaster(Email email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rent = abc.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == email.RentalAgreementID).FirstOrDefault();
            var date = rent.RENTALENDDATE;
            if (email.TerminationDate < date)
            {
                try
                {
                    RENTAL_AGREEMENT emails = new RENTAL_AGREEMENT();
                    emails = abc.RENTAL_AGREEMENT.Find(email.RentalAgreementID);


                    if (email.TerminationDate < date)
                    {
                        emails.RENTALSTATUSID = 4;
                        emails.RENTALAGREEMENTID = email.RentalAgreementID;
                        emails.TerminateRentalDate = email.TerminationDate;
                    }
                    int i = this.abc.SaveChanges();
                    try
                    {
                        var clientID = abc.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.CLIENTID).FirstOrDefault();
                        var referenceNo = abc.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.REFERENCE_NO).FirstOrDefault();
                        var theClient = abc.CLIENTs.Find(clientID);
                        //send email with verification OTP
                        MailMessage mail = new MailMessage();
                        SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                        mail.From = new MailAddress("t4596334@gmail.com");
                        mail.To.Add("russmj912@gmail.com");
                        mail.Subject = "Termination Request From: " + theClient.NAME + " " + theClient.SURNAME;
                        mail.Body = "Rental Agreement Reference Number " + referenceNo + " \n " + theClient.NAME + "  " + theClient.SURNAME + "would like to terminate their rental agreement \n Client Details \n Client ID : " + theClient.CLIENTID + " \n Name: " + theClient.NAME + " " + theClient.SURNAME + "\n Termination Request Details \n Termination Date : " + email.TerminationDate + "\n Termination Reason: " + email.TerminationReason;
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
                catch (Exception)
                {
                    return null;
                }
            }
            if (email.TerminationDate > date)
            {
                try
                {
                    var clientID = abc.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.CLIENTID).FirstOrDefault();
                    var referenceNo = abc.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.REFERENCE_NO).FirstOrDefault();
                    var theClient = abc.CLIENTs.Find(clientID);
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(theClient.EMAIL);
                    mail.Subject = "Termination Request Date Invalid ";
                    mail.Body = "The Termination Request for Rental Agreement Reference Number " + referenceNo + " \n " + theClient.NAME + "  " + theClient.SURNAME + "has failed  because the rental termination date is Invalid. Please select a date before the Rental agreements's End date \n Client Details \n Client ID : " + theClient.CLIENTID + " \n Name: " + theClient.NAME + " " + theClient.SURNAME + "\n Invalid Termination Date:" + email.TerminationDate;
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
            return Ok(email);

        }


        [HttpGet]
        [Route("GetDate/{RENTALAGREEMENTID}")]
        public dynamic GetDate(int RentalagreementID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetDates(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == RentalagreementID).FirstOrDefault());
        }
        private dynamic GetDates(RENTAL_AGREEMENT forbros)
        {
            dynamic dynamicjob = new ExpandoObject();
            dynamicjob = forbros.RENTALENDDATE;
            return dynamicjob;
        }



        //-------------
    }





}

