using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.IO;
using System.Net.Http.Headers;
using System.Web;
using System.Net.Mail;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        INF370Entities db = new INF370Entities();

        INF370Entities abc = new INF370Entities();

        [Route("GetExtensionRequest")]
        public List<dynamic> GetExtensionRequest()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetExtensionRequests(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTATUSID == 3).ToList());

        }
        private List<dynamic> GetExtensionRequests(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicagreements = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT ra in forbros)
            {

                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();
                dynamic dynamicagreement = new ExpandoObject();
                dynamicagreement.RENTALAGREEMENTID = ra.RENTALAGREEMENTID;
                dynamicagreement.RENTALSTATUSID = ra.RENTALSTATUSID;
                // dynamicagreement.USERID = ra.USERID;
                dynamicagreement.CLIENTID = ra.CLIENTID;
                dynamicagreement.RENTALAPPLICATIONID = ra.RENTALAPPLICATIONID;
                dynamicagreement.PROPERTYID = ra.PROPERTYID;
                dynamicagreement.RENTALSTARTDATE = ra.RENTALSTARTDATE;
                dynamicagreement.RENTALENDDATE = ra.RENTALENDDATE;
                dynamicagreement.NAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.NAME);
                dynamicagreement.SURNAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.SURNAME);
                dynamicagreement.EMAIL = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.EMAIL);
                dynamicagreement.ADDRESS = prop.Where(XX => XX.PROPERTYID == ra.PROPERTYID).Select(m => m.ADDRESS);
                //dynamicagreement.USERNAME = usr.Where(XX => XX.USERID == ra.USERID).Select(m => m.USERNAME);
                dynamicagreement.ExtendRentalDate = ra.ExtendRentalDate;
                dynamicagreements.Add(dynamicagreement);
            }
            return dynamicagreements;
        }

        [HttpGet]
        [Route("GetAgreementDetailsById/{RENTALAGREEMENTID}")]
        public IHttpActionResult GetAgreementDetailsById(string RENTALAGREEMENTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTAL_AGREEMENT abc = new RENTAL_AGREEMENT();
           
            try
            {
                int ID = Convert.ToInt32(RENTALAGREEMENTID);
                abc = db.RENTAL_AGREEMENT.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(abc);
        }

        [Route("GetDuedate")]
        public List<dynamic> GetDuedate()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetDuedates(db.RENTAL_AGREEMENT.Where(zz => zz.DepositDueDate > DateTime.Today).ToList());

        }
        private List<dynamic> GetDuedates(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;


                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        //[HttpGet]
        //[Route("GetApplicationById/{DocumentID}")]
        //public IHttpActionResult GetApplicationById(string DocumentID)
        //{

        //    db.Configuration.ProxyCreationEnabled = false;

        //    DOCUMENT obj = new DOCUMENT();

        //    try
        //    {
        //        int ID = Convert.ToInt32(DocumentID);
        //        obj = db.DOCUMENTs.Find(ID);
        //        if (abc == null)
        //        {
        //            return NotFound();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        return null;            }

        //    return Ok(obj);
        //}



        [HttpGet]
        [Route("GetduedateById/{RENTALAGREEMENTID}")]
        public IHttpActionResult GetduedateById(string RENTALAGREEMENTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTAL_AGREEMENT abc = new RENTAL_AGREEMENT();
        
            try
            {
                int ID = Convert.ToInt32(RENTALAGREEMENTID);
                abc = db.RENTAL_AGREEMENT.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(abc);
        }
        [HttpPut]
        [Route("ExtendduedateDetails")]
        public IHttpActionResult PutjobMaster(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;
                    dues.DepositDueDate = due.DepositDueDate;
                }
                int i = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    var email = cln.EMAIL;
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Deposit due extended";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n  Your deposit due date has been extended to this date: " + due.DepositDueDate;

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
            return Ok(due);
        }

        [Route("Getleaseexpiryreminder")]
        public List<dynamic> Getleaseexpiryreminder()
        {
            int clientid = 5;

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return leaseexpiryreminder(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == clientid).ToList());

        }
        private List<dynamic> leaseexpiryreminder(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;

                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [Route("GetTerminationRequest")]
        public List<dynamic> GetTerminationRequest()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetTerminationRequests(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTATUSID == 4).ToList());

        }
        private List<dynamic> GetTerminationRequests(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicagreements = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT ra in forbros)
            {

                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();
                dynamic dynamicagreement = new ExpandoObject();
                dynamicagreement.RENTALAGREEMENTID = ra.RENTALAGREEMENTID;
                dynamicagreement.RENTALSTATUSID = ra.RENTALSTATUSID;
                // dynamicagreement.USERID = ra.USERID;
                dynamicagreement.CLIENTID = ra.CLIENTID;
                dynamicagreement.RENTALAPPLICATIONID = ra.RENTALAPPLICATIONID;
                dynamicagreement.PROPERTYID = ra.PROPERTYID;
                dynamicagreement.RENTALSTARTDATE = ra.RENTALSTARTDATE;
                dynamicagreement.RENTALENDDATE = ra.RENTALENDDATE;
                dynamicagreement.TerminateRentalDate = ra.TerminateRentalDate;
                var getOwing = ra.AMOUNTDUE;

                if(getOwing>0)
                {
                    dynamicagreement.Owing = "Yes";

                }
                else
                {
                    dynamicagreement.Owing = "No";

                }
                dynamicagreement.NAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.NAME);
                dynamicagreement.SURNAME = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.SURNAME);
                dynamicagreement.EMAIL = clnt.Where(XX => XX.CLIENTID == ra.CLIENTID).Select(m => m.EMAIL);
                dynamicagreement.ADDRESS = prop.Where(XX => XX.PROPERTYID == ra.PROPERTYID).Select(m => m.ADDRESS);
                //   dynamicagreement.USERNAME = usr.Where(XX => XX.USERID == ra.USERID).Select(m => m.USERNAME);
                dynamicagreements.Add(dynamicagreement);
            }
            return dynamicagreements;
        }
        [Route("Getpaymetreminder")]
        public List<dynamic> Getpaymetreminder()
        {
            int clientid = 4;
            DateTime today;
            today = DateTime.Today;
            DateTime Duedate = DateTime.FromOADate(25);

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return Getpaymetreminders(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == clientid).ToList());

        }
        private List<dynamic> Getpaymetreminders(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                // dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                dynamicduedate.PAYMENTID = dd.DepositDueDate;

                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [HttpGet]
        [Route("GetUnassignedJobs")]
        public List<dynamic> GetUnassignedJobs()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetUnassignedJob(db.JOBs.Include(ZZ => ZZ.RENTAL_AGREEMENT).Where(zz => zz.JOBTYPEID == 1 && zz.JOBSTATUSID == 1).ToList());

        }
        private List<dynamic> GetUnassignedJob(List<JOB> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (JOB Jb in forbros)
            {

                var Rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == Jb.RENTALAGREEMENTID).FirstOrDefault();
                var clnID = Rent.CLIENTID;

                //List<PROPERTY> Prop = new List<PROPERTY>();
                var Prop = db.PROPERTies.ToList();
                var usr = db.USERs.ToList();
                var stat = db.JOBSTATUS.ToList();
                var cln= db.CLIENTs.Find(clnID);

                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.JOBID = Jb.JOBID;
                dynamicjob.ADDRESS = Prop.Where(zz => zz.PROPERTYID == Rent.PROPERTYID).Select(x => x.ADDRESS).FirstOrDefault();
                dynamicjob.RENTALAGREEMENTID = Jb.RENTALAGREEMENTID;
                dynamicjob.USERNAME = cln.NAME + " " + cln.SURNAME;

                
                dynamicjob.JOBTYPEID = Jb.JOBTYPEID;
                dynamicjob.EMPLOYEEID = Jb.EMPLOYEEID;
                dynamicjob.JOBSTATUS = stat.Where(aa => aa.JOBSTATUSID == Jb.JOBSTATUSID).Select(c => c.DESCRIPTION).FirstOrDefault();
                dynamicjob.DATEREQUESTED = Jb.DATEREQUESTED;
                dynamicjob.DESCRIPTION = Jb.DESCRIPTION;
                dynamicjob.DATECOMPLETED = Jb.DATECOMPLETED;
                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }

        [HttpGet]
        [Route("GetJobDetailsById/{JOBID}")]
        public IHttpActionResult GetJobDetailsById(string JOBID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            JOB abc = new JOB();
          
            try
            {
                int ID = Convert.ToInt32(JOBID);
                abc = db.JOBs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(abc);
        }
        [HttpPut]
        [Route("UpdateJobDetails")]
        public IHttpActionResult PutjobMaster(JOB job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                JOB objjob = new JOB();
                objjob = abc.JOBs.Find(job.JOBID);
                if (objjob != null)
                {
                    objjob.JOBID = job.JOBID;
                    objjob.EMPLOYEEID = job.EMPLOYEEID;
                    objjob.JOBSTATUSID = 2;





                }
                int i = this.abc.SaveChanges();

                try
                {
                    var emp = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == job.EMPLOYEEID).FirstOrDefault();
                    var jb = db.JOBs.Where(zz => zz.JOBID == job.JOBID).FirstOrDefault();
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == job.RENTALAGREEMENTID).FirstOrDefault();
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    var email = emp.EMAIL;
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Job Assigned";
                    mail.Body = "Good day" + emp.NAME + "" + emp.SURNAME + "\n  A Job has been assigned to you. At the Adress: " + prop.ADDRESS + " view assigned jobs for more details";

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
            return Ok(job);
        }
        [Route("GetApplication")]
        public List<dynamic> GetApplication()
        {

            INF370Entities db = new INF370Entities();

            db.Configuration.ProxyCreationEnabled = false;
            return GetApplications(db.RENTALAPPLICATIONs.Include(zz => zz.DOCUMENTs).Where(zz => zz.RENTALAPPLICATIONSTATUSID == 1).ToList());

        }
        private List<dynamic> GetApplications(List<RENTALAPPLICATION> forbros)
        {
            List<dynamic> dynamicapplications = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTALAPPLICATION dc in forbros)
            {
                var docs = db.DOCUMENTs.ToList();
                var usr = db.USERs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prop = db.PROPERTies.ToList();


                dynamic dynamicapplication = new ExpandoObject();

                dynamicapplication.DOCUMENTID = docs.Where(aa => aa.RENTALAPPLICATIONID == dc.RENTALAPPLICATIONID).Select(a => a.DOCUMENTID);
                dynamicapplication.IDENTITYDOCUMENT = docs.Where(aa => aa.RENTALAPPLICATIONID == dc.RENTALAPPLICATIONID).Select(a => a.IDENTITYDOCUMENT).FirstOrDefault();

                dynamicapplication.PAYSLIP = docs.Where(aa => aa.RENTALAPPLICATIONID == dc.RENTALAPPLICATIONID).Select(a => a.PAYSLIP).FirstOrDefault();
                dynamicapplication.BURSARYLETTER = docs.Where(aa => aa.RENTALAPPLICATIONID == dc.RENTALAPPLICATIONID).Select(a => a.BURSARYLETTER).FirstOrDefault();
                dynamicapplication.RENTALAPPLICATIONID = dc.RENTALAPPLICATIONID;
                //  dynamicapplication.USERID = dc.RENTALAPPLICATION.USERID;
                dynamicapplication.CLIENTID = dc.CLIENTID;
                dynamicapplication.PROPERTYID = dc.PROPERTYID;
                dynamicapplication.RENTALAGREEMENTID = dc.RENTALAGREEMENTID;
                dynamicapplication.RENTALAPPLICATIONSTATUSID = dc.RENTALAPPLICATIONSTATUSID;
                dynamicapplication.APPLICATIONDATE = dc.APPLICATIONDATE;
                dynamicapplication.PREFERREDSTARTDATE = dc.PREFERREDSTARTDATE;
                dynamicapplication.NAME = clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.NAME).FirstOrDefault() +" "+ clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.SURNAME).FirstOrDefault();
                dynamicapplication.ID = clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.ID).FirstOrDefault();
                dynamicapplication.PASSPORT = clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.PASSPORT_NO).FirstOrDefault();
                dynamicapplication.SALARY = clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.GROSS_SALARY).FirstOrDefault();
                dynamicapplication.EMAIL = clnt.Where(XX => XX.CLIENTID == dc.CLIENTID).Select(m => m.EMAIL).FirstOrDefault();
                dynamicapplication.ADDRESS = prop.Where(XX => XX.PROPERTYID == dc.PROPERTYID).Select(m => m.ADDRESS).FirstOrDefault();
                //dynamicapplication.USERNAME = usr.Where(XX => XX.USERID == dc.RENTALAPPLICATION.USERID).Select(m => m.USERNAME);

                dynamicapplications.Add(dynamicapplication);
            }
            return dynamicapplications;
        }

        [HttpGet]
        [Route("GetApplicationsDetailsById/{RENTALAPPLICATIONID}")]
        public IHttpActionResult GetApplicationsDetailsById(string RENTALAPPLICATIONID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTALAPPLICATION abc = new RENTALAPPLICATION();
          
            try
            {
                int ID = Convert.ToInt32(RENTALAPPLICATIONID);
                abc = db.RENTALAPPLICATIONs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(abc);
        }

        [Route("Getagreement/{ID}")]
        public List<dynamic> Getagreement(int ID)
        {
          

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return Getagreement(db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == ID).ToList());

        }
        private List<dynamic> Getagreement(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prp = db.PROPERTies.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //   dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                //dynamicduedate.PAYMENTID = dd.DepositDueDate; //How are DepositDueDate and PAYMENTID related?
                dynamicduedate.ADDRESS = prp.Where(aa => aa.PROPERTYID == usr.PROPERTYID).Select(a => a.ADDRESS);
                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        [HttpPost]
        [Route("AddFileDetails")]
        public IHttpActionResult AddFile()
        {
            string result = "";
            try
            {
                INF370Entities objEntity = new INF370Entities();
                DOCUMENT objFile = new DOCUMENT();

                string fileName = null;

                var httpRequest = HttpContext.Current.Request;

                var postedFile = httpRequest.Files["FileUpload"];





                if (postedFile != null)
                {
                    fileName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                    fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Files/" + fileName);
                    postedFile.SaveAs(filePath);
                }
                //objFile.DOCUMENTTYPEID = 1;
                objFile.RENTALAPPLICATIONID = 9;
                objFile.IDENTITYDOCUMENT = fileName;
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

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(result);
        }


        [HttpGet]
        [Route("GetFile")]
        //download file api
        public dynamic GetFile(string IDENTITYDocument)
        {

            //Create HTTP Response.
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);

            //Set the File Path.
            string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/") + IDENTITYDocument;

            //Check whether File exists.
            if (!File.Exists(filePath))
            {
                //Throw 404 (Not Found) exception if File not found.
                response.StatusCode = HttpStatusCode.NotFound;
                response.ReasonPhrase = string.Format("File not found: {0} .", IDENTITYDocument);
                return null;      }

            //Read the File into a Byte Array.
            byte[] bytes = File.ReadAllBytes(filePath);

            //Set the Response Content.
            response.Content = new ByteArrayContent(bytes);

            //Set the Response Content Length.
            response.Content.Headers.ContentLength = bytes.LongLength;

            //Set the Content Disposition Header Value and FileName.
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = IDENTITYDocument;

            //Set the File Content Type.
            //  response.Content.Headers.ContentType = new MediaTypeHeaderValue(MimeMapping.GetMimeMapping(".docx"));
            return response;
        }

        [HttpGet]
        [Route("GetFileDetails")]
        public IHttpActionResult GetFile()
        {
            var url = HttpContext.Current.Request.Url;
            IEnumerable<DocDetailsVM> lstFile = new List<DocDetailsVM>();
            try
            {
                INF370Entities objEntity = new INF370Entities();

                lstFile = objEntity.DOCUMENTs.Select(a => new DocDetailsVM
                {
                    DOCUMENTID = a.DOCUMENTID,

                    IDENTITYDOCUMENT = a.IDENTITYDOCUMENT,

                }).ToList();
            }
            catch (Exception)
            {
                return null;

            }
            return Ok(lstFile);
        }

        [HttpGet]
        [Route("allAgreement")]
        public List<dynamic> allAgreement()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return Getagreements(db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTATUSID == 1).ToList());
            }
            catch (Exception)
            {
                return null;
            }
        }
        private List<dynamic> Getagreements(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (RENTAL_AGREEMENT dd in forbros)
            {

                var usr = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == dd.RENTALAGREEMENTID).FirstOrDefault();
                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();
                var prp = db.PROPERTies.ToList();

                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.DepositDueDate = dd.DepositDueDate;
                dynamicduedate.RENTALSTATUSID = dd.RENTALSTATUSID;
                //   dynamicduedate.USERID = dd.USERID;
                dynamicduedate.CLIENTID = dd.CLIENTID;
                dynamicduedate.RENTALAPPLICATIONID = dd.RENTALAPPLICATIONID;
                dynamicduedate.PROPERTYID = dd.PROPERTYID;
                dynamicduedate.RENTALSTARTDATE = dd.RENTALSTARTDATE;
                dynamicduedate.RENTALENDDATE = dd.RENTALENDDATE;
                //dynamicduedate.PAYMENTID = dd.DepositDueDate; //How are DepositDueDate and PAYMENTID related?
                dynamicduedate.ADDRESS = prp.Where(aa => aa.PROPERTYID == usr.PROPERTYID).Select(a => a.ADDRESS);
                dynamicduedate.NAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.NAME);
                dynamicduedate.SURNAME = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.SURNAME);
                dynamicduedate.PHONENUMBER = clnt.Where(aa => aa.CLIENTID == usr.CLIENTID).Select(a => a.PHONENUMBER);



                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }


        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="due"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("UpdateRentalAgreementDetails")]
        public IHttpActionResult UpdateRentalAgreementDetails(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;
                    dues.DepositDueDate = due.DepositDueDate;
                    dues.RENTALSTATUSID = 4;
                }
                int i = this.abc.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return Ok(due);
        }







        [HttpPut]
        [Route("AcceptExtensionRequestDetails")]
        public IHttpActionResult PutexcptMaster(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;
                    dues.RENTALENDDATE = due.ExtendRentalDate;
                    dues.RENTALSTATUSID = 1;

                }
                int i = this.abc.SaveChanges();

                try
                {
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Rental Extension Request Accepted ";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n Your Rental Extension request has been Accepted. Your rental agrement for Property: " + prop.ADDRESS + " has been extended.";

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
            return Ok(due);
        }

        [HttpGet]
        [Route("Terminate/{ID}")]
        public IHttpActionResult Terminate(int ID)
        {

            try
            {
                RENTAL_AGREEMENT update = new RENTAL_AGREEMENT();
                update = db.RENTAL_AGREEMENT.Find(ID);
                update.RENTALSTATUSID = 2;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {

                return null;
            }







        }
        [HttpGet]
        [Route("GetApplicationById/{RentalApplicationID}")]
        public IHttpActionResult GetApplicationById(string RentalApplicationID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            RENTALAPPLICATION obj = new RENTALAPPLICATION();

            try
            {
                int ID = Convert.ToInt32(RentalApplicationID);
                obj = db.RENTALAPPLICATIONs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;
            }

            return Ok(obj);
        }



        [HttpGet]
        [Route("AllSchedule")]
        public IQueryable<INSPECTION> AllSchedule()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.INSPECTIONs.Where(kk=>kk.EMPLOYEEID==null);
            }
            catch (Exception)
            {
                return null;
            }
        }


        

        [HttpGet]
        [Route("AllSchedulebyId/{ID}")]
        public List<dynamic> AllSchedulebyId(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return AllSchedulebyIds(db.INSPECTIONs.Where(yy=>yy.EMPLOYEEID==ID&&yy.INSPECTION_STATUS_ID==2).ToList());
            }
            catch (Exception)
            {
                return null;
            }
        }

        private List<dynamic> AllSchedulebyIds(List<INSPECTION> forbros)
        {
            List<dynamic> dynamicEmployees = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (INSPECTION emp in forbros)
            {


                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                var AgrID = db.RENTAL_AGREEMENT.Where(jj => jj.RENTALAGREEMENTID == emp.RENTALAGREEMENTID).Select(ii => ii.CLIENTID).FirstOrDefault();
                var client = db.CLIENTs.Where(hh => hh.CLIENTID == AgrID).Select(kk => kk.NAME).FirstOrDefault() + " " + db.CLIENTs.Where(hh => hh.CLIENTID == AgrID).Select(kk => kk.SURNAME).FirstOrDefault();


                dynamic dynamicEmployee = new ExpandoObject();

                dynamicEmployee.EMPLOYEEID = emp.EMPLOYEEID;
                dynamicEmployee.INSPECTIONID = emp.INSPECTIONID;
                dynamicEmployee.INSPECTIONDATE = emp.INSPECTIONDATE;
               var SLOT = db.SLOTs.Where(hh => hh.SLOTID == emp.SLOTID).FirstOrDefault();
                dynamicEmployee.TIME = SLOT.STARTTIME + " - " + SLOT.ENDTIME; ;
                //dynamicEmployee.ENDTIME = SLOT.ENDTIME;
                dynamicEmployee.CLIENT = client;
                //dynamicEmployee.DATEEMPLOYED = emp.DATEEMPLOYED;
                //dynamicEmployee.NAME = emp.NAME;
                //dynamicEmployee.SURNAME = emp.SURNAME;
                //dynamicEmployee.DATEOFBIRTH = emp.DATEOFBIRTH;
                //dynamicEmployee.PHONE_NUMBER = emp.PHONE_NUMBER;
                //dynamicEmployee.EMAIL = emp.EMAIL;

                dynamicEmployees.Add(dynamicEmployee);
            }
            return dynamicEmployees;
        }

        //[HttpGet]
        //[Route("AllSchedulebyId/{ID}")]
        //public INSPECTION AllSchedulebyId(int ID)
        //{
        //    INF370Entities db = new INF370Entities();
        //    db.Configuration.ProxyCreationEnabled = false;
        //    try
        //    {
        //        return db.INSPECTIONs.Find(ID);
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}



        [Route("GetAllEmployees")]
        public List<dynamic> GetAllEmployees()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAllEmployees(db.EMPLOYEEs.Where(zz => zz.EMPLOYEETYPEID == 3).ToList());

        }
        private List<dynamic> GetAllEmployees(List<EMPLOYEE> forbros)
        {
            List<dynamic> dynamicEmployees = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEE emp in forbros)
            {


                var rent = db.RENTALAPPLICATIONs.ToList();
                var clnt = db.CLIENTs.ToList();

                dynamic dynamicEmployee = new ExpandoObject();

                dynamicEmployee.EMPLOYEEID = emp.EMPLOYEEID;
                dynamicEmployee.USERID = emp.USERID;
                dynamicEmployee.EMPLOYEETYPEID = emp.EMPLOYEETYPEID;
                dynamicEmployee.EMPLOYEENATIONALID = emp.EMPLOYEENATIONALID;
                dynamicEmployee.EMPLOYEEPASSPORTNO = emp.EMPLOYEEPASSPORTNO;
                dynamicEmployee.DATEEMPLOYED = emp.DATEEMPLOYED;
                dynamicEmployee.NAME = emp.NAME;
                dynamicEmployee.SURNAME = emp.SURNAME;
                dynamicEmployee.DATEOFBIRTH = emp.DATEOFBIRTH;
                dynamicEmployee.PHONE_NUMBER = emp.PHONE_NUMBER;
                dynamicEmployee.EMAIL = emp.EMAIL;

                dynamicEmployees.Add(dynamicEmployee);
            }
            return dynamicEmployees;
        }

        [HttpPut]
        [Route("UpdateappDetails")]
        public IHttpActionResult PutagreeMaster(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;
                    dues.DepositDueDate = due.DepositDueDate;
                    dues.RENTALSTATUSID = 3;

                }
                int i = this.abc.SaveChanges();

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(due);
        }




        [HttpPut]
        [Route("UpdateAppAccepted")]
        public IHttpActionResult Putappaster(RENTALAPPLICATION app)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTALAPPLICATION objapp = new RENTALAPPLICATION();
                PROPERTY prp = new PROPERTY();
                var rentprop = db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == app.RENTALAPPLICATIONID).FirstOrDefault();
                var propy = db.PROPERTies.Where(cc => cc.PROPERTYID == rentprop.PROPERTYID).FirstOrDefault();

                prp = abc.PROPERTies.Find(propy.PROPERTYID);
                objapp = abc.RENTALAPPLICATIONs.Find(app.RENTALAPPLICATIONID);
                if (objapp != null)
                {
                    objapp.RENTALAPPLICATIONID = app.RENTALAPPLICATIONID;
                    objapp.RENTALAPPLICATIONSTATUSID = 2;





                }
                int i = this.abc.SaveChanges();
                if (prp != null)
                {
                    prp.PROPERTYID = propy.PROPERTYID;
                    prp.PROPERTYSTATUSID = 2;
                }
                int ii = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == app.RENTALAPPLICATIONID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Rental Application Accepted";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n Your Rental Application for Property: " + prop.ADDRESS + " has been Accepted. Please navigate to Rental Management then select Accept Rental Agreement on our site to accept a rental agreement";

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

            return Ok(app);




        }

        [HttpPut]
        [Route("UpdateAppRejected")]
        public IHttpActionResult Putappmaster(RENTALAPPLICATION app)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTALAPPLICATION objapp = new RENTALAPPLICATION();
                objapp = abc.RENTALAPPLICATIONs.Find(app.RENTALAPPLICATIONID);
                if (objapp != null)
                {
                    objapp.RENTALAPPLICATIONID = app.RENTALAPPLICATIONID;
                    objapp.RENTALAPPLICATIONSTATUSID = 3;





                }
                int i = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == app.RENTALAPPLICATIONID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Rental Application Rejected";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n Your rental application for Property: " + prop.ADDRESS + " was Rejected.Minimum requirements were not met. Please visit our site to apply for a different property";

                    SmtpServer.Port = 587;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    SmtpServer.EnableSsl = true;

                    SmtpServer.Send(mail);


                    //  return Request.CreateResponse(HttpStatusCode.Created);
                    //-------------
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
            return Ok(app);
        }
        [HttpGet]
        [Route("GetrejApplicationById/{DocumentID}")]
        public IHttpActionResult GetrejApplicationById(string DocumentID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            DOCUMENT obj = new DOCUMENT();
          
            try
            {
                int ID = Convert.ToInt32(DocumentID);
                obj = db.DOCUMENTs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(obj);
        }


        [HttpGet]
        [Route("GetappsDetailsById/{RENTALAPPLICATIONID}")]
        public List<dynamic> GetappsDetailsById(string RENTALAPPLICATIONID)
        {
            try
            {
                var applicationId = Convert.ToInt32(RENTALAPPLICATIONID);

                INF370Entities db = new INF370Entities();
                db.Configuration.ProxyCreationEnabled = false;
                return Getapp(db.RENTALAPPLICATIONs.Where(zz => zz.RENTALAPPLICATIONID == applicationId).ToList());
            }
            catch (Exception)
            {

                return null;
            }
       

        }
        private List<dynamic> Getapp(List<RENTALAPPLICATION> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTALAPPLICATION Jb in forbros)
            {

                dynamic dynamicjob = new ExpandoObject();




                dynamicjob.RENTALAPPLICATIONID = Jb.RENTALAPPLICATIONID;


                dynamicjobs.Add(dynamicjob);


            }
            return dynamicjobs;
        }



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

                dynamic dynamicjob = new ExpandoObject();

                var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.RENTALAGREEMENTID = Jb.RENTALAGREEMENTID;
                dynamicjob.CLIENTID = Jb.CLIENTID;
                dynamicjob.Name = Jb.CLIENT.NAME;
                dynamicjob.SURNAME = Jb.CLIENT.SURNAME;
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.ReferenceNo = Jb.REFERENCE_NO;
                dynamicjob.AmountDue = Jb.AMOUNTDUE;
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
            return GetAmount(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.REFERENCE_NO == ReferenceNo).FirstOrDefault());

        }
        private dynamic GetAmount(RENTAL_AGREEMENT forbros)
        {
            dynamic dynamicjob = new ExpandoObject();
            dynamicjob = forbros.AMOUNTDUE * 2;
            return dynamicjob;
        }

        

             [HttpPost]
        [Route("InsertInspectionDetails")]
        public IHttpActionResult PostOwner(INSPECTION data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            try
            {
                INSPECTION inspect = db.INSPECTIONs.Find(data.INSPECTIONID);

                inspect.INSPECTION_STATUS_ID = 2;
                inspect.SLOTID = data.SLOTID;
                inspect.INSPECTIONDATE = data.INSPECTIONDATE;
                inspect.EMPLOYEEID = data.EMPLOYEEID;


                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }



            return Ok(data);
        }


        [HttpPost]
        [Route("CompleteInspect")]
        public IHttpActionResult CompleteInspect(INSPECTION data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            try
            {
                INSPECTION inspect = db.INSPECTIONs.Find(data.INSPECTIONID);

                inspect.INSPECTION_STATUS_ID = 3;
                inspect.INSPECTIONNOTE = data.INSPECTIONNOTE;

                inspect.DATECOMPLETED = DateTime.Today;
                inspect.INSPECTIONPASSED = data.INSPECTIONPASSED;
                //inspect.EMPLOYEEID = data.EMPLOYEEID;



                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }



            return Ok(data);
        }











        [HttpPost]
        [Route("FailInspect")]
        public IHttpActionResult FailInspect(INSPECTION data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;


            try
            {
                INSPECTION inspect = db.INSPECTIONs.Find(data.INSPECTIONID);

                inspect.INSPECTION_STATUS_ID = 3;

                inspect.INSPECTIONNOTE = data.INSPECTIONNOTE;

                inspect.DATECOMPLETED = DateTime.Today;
                inspect.INSPECTIONPASSED = data.INSPECTIONPASSED;
                //inspect.EMPLOYEEID = data.EMPLOYEEID;
                db.SaveChanges();

                JOB newJob = new JOB();
                newJob.RENTALAGREEMENTID = inspect.RENTALAGREEMENTID;
                newJob.JOBTYPEID = 2;
                newJob.JOBSTATUSID = 1;
                newJob.DATEREQUESTED = DateTime.Today;
                newJob.DESCRIPTION = data.INSPECTIONNOTE;

                db.JOBs.Add(newJob);
                db.SaveChanges();

                var clientID = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == inspect.RENTALAGREEMENTID).Select(vvs => vvs.CLIENTID).FirstOrDefault();
                var referenceNo = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == inspect.RENTALAGREEMENTID).Select(vvs => vvs.REFERENCE_NO).FirstOrDefault();
                var theClient = db.CLIENTs.Find(clientID);
                //send email with verification OTP
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add("inturbidus653@gmail.com");
                mail.Subject = "Maintenance Request From: " + theClient.NAME + " " + theClient.SURNAME;
                mail.Body = "Rental Agreement Reference Number " + referenceNo + " \n Client Details \n Client ID : " + theClient.CLIENTID + " \n Name: " + theClient.NAME + " " + theClient.SURNAME + "Maintenance Request Details \n Repair Required : " + data.INSPECTIONNOTE;

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



            return Ok(data);
        }











        [HttpPost]
        [Route("InsertPaymentDetails")]
        public IHttpActionResult PostNewPayment(PAYMENT payment)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (var pay = new INF370Entities())
            {
                pay.PAYMENTs.Add(new PAYMENT()
                {
                    PAYMENTID = payment.PAYMENTID,

                    RENTALAGREEMENTID = payment.RENTALAGREEMENTID,
                    PAYMENTTYPEID = 1,
                    PAYMENT_REFERENCE_NO = payment.PAYMENT_REFERENCE_NO,
                    PAYMENT_AMOUNT = payment.PAYMENT_AMOUNT,
                    PAYMENTDATETIME = DateTime.Now,

                });

                pay.SaveChanges();
            }

            return Ok();
        }


        [HttpPut]
        [Route("UpdateRentalAgreement")]
        public IHttpActionResult PutRentalAgreements(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;

                    dues.RENTALSTATUSID = 1;

                }
                int i = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Rental Extension Request Rejected";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n Your Rental Extension Request for Property: " + prop.ADDRESS + " has been Rejected.Please contact us on 08123456789 for more info.";

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
            return Ok(due);
        }

        [HttpPut]
        [Route("UpdateATRentalAgreementDetails")]
        public IHttpActionResult PutRentalATAgreement(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                PROPERTY prp = new PROPERTY();
                var rentprop = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                var propy = db.PROPERTies.Where(cc => cc.PROPERTYID == rentprop.PROPERTYID).FirstOrDefault();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                prp = abc.PROPERTies.Find(propy.PROPERTYID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;

                    dues.RENTALSTATUSID = 2; //Change the rental end date instead
                    

                }
                int i = this.abc.SaveChanges();
                if (prp != null)
                {
                    prp.PROPERTYID = propy.PROPERTYID;
                    prp.PROPERTYSTATUSID = 1;
                    prp.AVAILABLEDATE = Convert.ToDateTime(dues.TerminateRentalDate).AddDays(5);
                }

                int ii = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();

                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Inturbidus: Rental Termination Request Accepted";
                    mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n Your Rental Termination request has been Accepted. Your rental agreement for the property: " + prop.ADDRESS + " Has been terminated.";
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
            return Ok(due);
        }
        [HttpPut]
        [Route("UpdateRTRentalAgreement")]
        public IHttpActionResult PutRTRentalAgreements(RENTAL_AGREEMENT due)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RENTAL_AGREEMENT dues = new RENTAL_AGREEMENT();
                dues = abc.RENTAL_AGREEMENT.Find(due.RENTALAGREEMENTID);
                if (dues != null)
                {
                    dues.RENTALAGREEMENTID = due.RENTALAGREEMENTID;

                    dues.RENTALSTATUSID = 1;


                }
                int i = this.abc.SaveChanges();
                try
                {
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == due.RENTALAGREEMENTID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Rental Termination Rejected";
                    mail.Body = "Good day "+ cln.NAME + " "+ cln.SURNAME +"\n Your Termination Request has been Rejected.Your lease for property: " + prop.ADDRESS + " is still active.Please pay the amount due before applying for termination";

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
            return Ok(due);
        }


        [HttpGet]
        [Route("Getpayment")]
        public List<dynamic> Getpayment()
        {


            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return Getpayments(db.PAYMENTs.Include(aa => aa.RENTAL_AGREEMENT).Where(zz => zz.RENTALAGREEMENTID == zz.RENTAL_AGREEMENT.RENTALAGREEMENTID && zz.RENTAL_AGREEMENT.RENTALSTATUSID == 4).ToList());

        }
        private List<dynamic> Getpayments(List<PAYMENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (PAYMENT dd in forbros)
            {


                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.PAYMENTID = dd.PAYMENTID;
                dynamicduedate.RENTALAGREEMENTID = dd.RENTALAGREEMENTID;
                dynamicduedate.PAYMENT_REFERENCE_NO = dd.PAYMENT_REFERENCE_NO;
                dynamicduedate.PAYMENT_AMOUNT = dd.PAYMENT_AMOUNT;
                dynamicduedate.PAYMENTDATETIME = dd.PAYMENTDATETIME;




                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }
        //[HttpPost]
        //[Route("SendMaintenanceEmail")]
        //public HttpResponseMessage SendTerminateEmail(Email email)
        //{

        //    //add try catch when done


        //    INF370Entities db = new INF370Entities();
        //    var clientID = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.CLIENTID).FirstOrDefault();
        //    var referenceNo = db.RENTAL_AGREEMENT.Where(nn => nn.RENTALAGREEMENTID == email.RentalAgreementID).Select(vvs => vvs.REFERENCE_NO).FirstOrDefault();
        //    var theClient = db.CLIENTs.Find(clientID);
        //    try
        //    {


        //        JOB newJob = new JOB();
        //        newJob.RENTALAGREEMENTID = email.RentalAgreementID;
        //        newJob.JOBTYPEID = 1;
        //        newJob.JOBSTATUSID = 1;
        //        newJob.DATEREQUESTED = DateTime.Today;
        //        newJob.DESCRIPTION = email.MaintenanceReason;

        //        db.JOBs.Add(newJob);
        //        db.SaveChanges();
        //    }
        //    catch (Exception)
        //    {

        //        return null;
        //    }

        //    try
        //    {
        //        //send email with verification OTP
        //        MailMessage mail = new MailMessage();
        //        SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
        //        mail.From = new MailAddress("t4596334@gmail.com");
        //        mail.To.Add("nhlanhlakhosa69@gmail.com");
        //        mail.Subject = "Repair Request From: " + theClient.NAME + " " + theClient.SURNAME;
        //        mail.Body = "Rental Agreement Reference Number " + referenceNo + " \n Client Details \n Client ID : " + theClient.CLIENTID + " \n Name: " + theClient.NAME + " " + theClient.SURNAME + "Repair Request Details \n Repair Required : " + email.MaintenanceReason;

        //        SmtpServer.Port = 587;
        //        SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
        //        SmtpServer.UseDefaultCredentials = false;
        //        SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
        //        SmtpServer.EnableSsl = true;

        //        SmtpServer.Send(mail);


        //        return Request.CreateResponse(HttpStatusCode.Created);
        //        //-------------
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }

        //}

    }
}