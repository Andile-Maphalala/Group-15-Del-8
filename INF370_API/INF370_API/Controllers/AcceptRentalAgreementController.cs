using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Dynamic;
using System.Net.Mail;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/AcceptRentalAgreement")]

    public class AcceptRentalAgreementController : ApiController
    {
        INF370Entities db = new INF370Entities();


        [HttpGet]
            [Route("ApprovedApplication/{ClientID}")]
            public List<dynamic> GetApprovedApplications(int ClientID)
            {

                INF370Entities db = new INF370Entities();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return GetApprovedApplications(db.RENTALAPPLICATIONs.Where(zz => zz.CLIENTID == ClientID && zz.RENTALAPPLICATIONSTATUSID == 2).ToList());

            }
            catch (Exception)
            {

                return null;
            }
             
            }
            private List<dynamic> GetApprovedApplications(List<RENTALAPPLICATION> forbros)
            {
                List<dynamic> dynamicjobs = new List<dynamic>();
                INF370Entities db = new INF370Entities();
            try
            {
                foreach (RENTALAPPLICATION Jb in forbros)
                {
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.ApplicationDate = Jb.APPLICATIONDATE;
                    dynamicjob.PropertyReference = Jb.PROPERTYID;
                    dynamicjob.ApplicationNum = Jb.RENTALAPPLICATIONID;

                    dynamicjobs.Add(dynamicjob);
                }

            }
            catch (Exception)
            {

                return null;
            }
              
                return dynamicjobs;
            }
        [HttpGet]
        [Route("GetRentalAgreementdetails/{RentalApplicationID}")]
        public List<dynamic> GetRentalAgreementdetails(int RentalApplicationID)
        {

            INF370Entities db = new INF370Entities();
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                return GetRentalAgreementdetails(db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == RentalApplicationID).Include(zz => zz.PROPERTY).ToList());

            }
            catch (Exception)
            {

                return null;
            }
          
        }
        private List<dynamic> GetRentalAgreementdetails(List<RENTALAPPLICATION> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTALAPPLICATION Jb in forbros)
            {
                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.PropertyID = Jb.PROPERTYID;
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.Name = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.NAME);
                dynamicjob.Surname = db.CLIENTs.Where(zz => zz.CLIENTID == Jb.CLIENTID).Select(zz => zz.SURNAME);
                dynamicjob.RentalAmount = db.RENTALAMOUNTs.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.AMOUNT);

                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }

  
            [HttpPost]
            [Route("AddRentalAgreement")]
            public dynamic AddRentalAgreement(AddRentalAgreement sd)
            {


                //  var httpRequest = HttpContext.Current.Request;

                RENTAL_AGREEMENT rentalAgreement = new RENTAL_AGREEMENT();
            RENTALAPPLICATION rentalAppl = new RENTALAPPLICATION();
            PROPERTY prop = new PROPERTY();
                 Random random = new Random();
            prop = db.PROPERTies.Find(sd.PropertyID);

           


            //Save to DB
            try
                {

                rentalAgreement.CLIENTID = sd.ClientID;
                rentalAgreement.PROPERTYID = sd.PropertyID;
                rentalAgreement.RENTALSTATUSID = 1;
                var REFERENCE_NO = random.Next(100000, 999999).ToString();
                rentalAgreement.REFERENCE_NO = REFERENCE_NO;
                rentalAgreement.AMOUNTDUE = db.RENTALAMOUNTs.Where(zz => zz.PROPERTYID == sd.PropertyID).Select(zz => zz.AMOUNT).FirstOrDefault();
                rentalAgreement.RENTALAPPLICATIONID = sd.RentalApplicationID; 
                rentalAgreement.RENTALSTARTDATE = DateTime.Today;
                rentalAgreement.DepositDueDate = DateTime.Today.AddDays(7);

                //db.RENTALAPPLICATIONs.Where(xx=>xx.CLIENTID==sd.RentalApplicationID).Select(ss=>ss.PREFERREDSTARTDATE).FirstOrDefault();
                rentalAgreement.RENTALENDDATE = DateTime.Now.AddYears(1);
                db.RENTAL_AGREEMENT.Add(rentalAgreement);
                db.SaveChanges();


                var theClient = db.CLIENTs.Where(hh => hh.CLIENTID == sd.ClientID).FirstOrDefault();
                var agreement= db.RENTAL_AGREEMENT.Where(hh => hh.REFERENCE_NO == REFERENCE_NO).FirstOrDefault();
                var address = db.PROPERTies.Where(hh => hh.PROPERTYID == sd.PropertyID).Select(jj => jj.ADDRESS).FirstOrDefault
                    ();
                
                //send email with verification
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add(theClient.EMAIL);
                mail.Subject = "Inturbidus: New Rental Agreement for " + theClient.NAME + " " + theClient.SURNAME;
                mail.Body = "Good day " + theClient.NAME + " " + theClient.SURNAME + "\n Here are you new rental agreement details:\n Rental Agreement Reference No:" + agreement.REFERENCE_NO+"\n  Property Address:" +address +"\nDetails regarding a move-in inspection will be sent once the deposit is paid. Please pay the deposit on our site within 7 days (by "+ agreement.DepositDueDate + " ) or else the rental agreement will be reverted. \n Please dont hesitate contact us should you have any queries.  \n\nHave a good day! ";
                //" \nRental Agreement Duration " + agreement.RENTALSTARTDATE + "-" + agreement.RENTAL
                SmtpServer.Port = 587;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);




            }
            catch (Exception e)
                {
                return false;
                }

          

            try
            {
                
                //change status of rental application to accepted here |||

                rentalAppl = db.RENTALAPPLICATIONs.Find(sd.RentalApplicationID);
                rentalAppl.RENTALAPPLICATIONSTATUSID = 5;
                prop.PROPERTYSTATUSID = 2;
                

                db.SaveChanges();
      


            }
            catch (Exception e)
                {
                return false;
                }


            //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
            return true;

            }

            public int getCreatedBookingID()
            {

                var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

                return 1;
            }


        [HttpGet]
        [Route("Reject/{ID}")]

        public dynamic Reject(int ID)
        {


            //  var httpRequest = HttpContext.Current.Request;

            RENTALAPPLICATION reject = new RENTALAPPLICATION();





            //Save to DB
            try
            {
                reject = db.RENTALAPPLICATIONs.Find(ID);
                reject.RENTALAPPLICATIONSTATUSID = 4;


                db.SaveChanges();

            }
            catch (Exception e)
            {

                return false;
            }
            return true;

        }

    }
    }



