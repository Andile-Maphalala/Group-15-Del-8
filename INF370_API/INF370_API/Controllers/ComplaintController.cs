using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Web.Cors;
using System.Web;
using INF370_API.ViewModels;
using System.Data.Entity;
using System.Web.Http.Cors;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net.Mail;

namespace INF370_API.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Complaint")]
    public class ComplaintController : ApiController
    {
        INF370Entities db = new INF370Entities();

        [Route("GetAllComplaints")]
        [HttpGet]
        public List<dynamic> GetAllComplaints()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                List<COMPLAINT> comList = db.COMPLAINTs.ToList();
                List<dynamic> ComplaintList = new List<dynamic>();



                foreach (var com in comList)
                {

                    dynamic myCom = new ExpandoObject();

                    myCom.ComplaintID = com.COMPLAINTID;
                    var rental = db.RENTAL_AGREEMENT.Where(jj => jj.RENTALAGREEMENTID == com.RENTALAGREEMENTID).FirstOrDefault();
                    var client = db.CLIENTs.Where(jj => jj.CLIENTID == rental.CLIENTID).FirstOrDefault();
                    COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                    myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                    myCom.Name = client.NAME +" "+ client.SURNAME;
                    myCom.Number = client.PHONENUMBER;
                    myCom.Date = com.DATE;

                    myCom.Details = com.DETAILS;
                    myCom.Photo = com.PHOTO;
                    if (com.PHOTO == "")
                    {
                        string filePath = HttpContext.Current.Server.MapPath("~/Images/notfound.png");
                        using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                fileStream.CopyTo(memoryStream);
                                Bitmap image = new Bitmap(1, 1);
                                image.Save(memoryStream, ImageFormat.Png);

                                byte[] byteImage = memoryStream.ToArray();
                                string base64String = Convert.ToBase64String(byteImage);
                                myCom.Photo = "data:image/png;base64," + base64String;
                            }
                        }

                    }
                    else
                    {
                        string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                        using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                fileStream.CopyTo(memoryStream);
                                Bitmap image = new Bitmap(1, 1);
                                image.Save(memoryStream, ImageFormat.Png);

                                byte[] byteImage = memoryStream.ToArray();
                                string base64String = Convert.ToBase64String(byteImage);
                                myCom.Photo = "data:image/png;base64," + base64String;
                            }
                        }
                    }

                    ComplaintList.Add(myCom);
                }

                //return db.Products.ToList();
                return ComplaintList;
            }
            catch (Exception)
            {
                return null;            }
        }

        [Route("GetUnassignedComplaints")]
        [HttpGet]
        public List<dynamic> GetUnassignedComplaints()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                List<COMPLAINT> comList = db.COMPLAINTs.ToList();
                List<dynamic> ComplaintList = new List<dynamic>();



                foreach (var com in comList)
                {
                    if (com.COMPLAINTSTATUSID == 1)
                    {


                        dynamic myCom = new ExpandoObject();

                        myCom.ComplaintID = com.COMPLAINTID;
                        var rental = db.RENTAL_AGREEMENT.Where(jj => jj.RENTALAGREEMENTID == com.RENTALAGREEMENTID).FirstOrDefault();
                        var client = db.CLIENTs.Where(jj => jj.CLIENTID == rental.CLIENTID).FirstOrDefault();
                        COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                        myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                        myCom.Name = client.NAME + " " + client.SURNAME;
                        myCom.Number = client.PHONENUMBER;
                        myCom.Date = com.DATE;

                        myCom.Details = com.DETAILS;
                        myCom.Photo = com.PHOTO;

                        if (com.PHOTO == "")
                        {
                            string filePath = HttpContext.Current.Server.MapPath("~/Images/notfound.png");
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    myCom.Photo = "data:image/png;base64," + base64String;
                                }
                            }

                        }
                        else
                        {
                            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    myCom.Photo = "data:image/png;base64," + base64String;
                                }
                            }
                        }

                        ComplaintList.Add(myCom);
                    }
                }

                //return db.Products.ToList();
                return ComplaintList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [Route("AddFeedback")]
        [HttpPost]
        public dynamic AddFeedback(dynamic feedback)
        {
            INF370Entities db = new INF370Entities();
            try
            {

         
            FEEDBACK feed = new FEEDBACK();
            feed.COMPLAINTID = feedback.COMPLAINTID;
            feed.DATE = DateTime.Now;
            feed.FEEDBACKCOMMENT = feedback.FEEDBACK;
            feed.JOBID = feedback.JOBID;
                db.FEEDBACKs.Add(feed);
                db.SaveChanges();
            }
            catch (Exception)
            {

                return null;
            }
            return true;


        }





        [Route("AddComplaint")]
        [HttpPost]
        public dynamic AddCOmplaint()
        {
            INF370Entities db = new INF370Entities();
            var httpRequest = HttpContext.Current.Request;
            string imageName = "";
            try
            {
               

                //Upload Image
                var postedFile = httpRequest.Files["Image"];

                if (postedFile == null)
                {
                    //imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(postedFile.FileName.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile.FileName);
                    //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    //var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                    //postedFile.SaveAs(filePath);

                }
                else
                {
                    imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(postedFile.FileName.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile.FileName);
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                    postedFile.SaveAs(filePath);
                }
          

            }
            catch
            {
                return false;
            }

            COMPLAINT conplaint = new COMPLAINT();
            //Save to DB
            try
            {
                conplaint.RENTALAGREEMENTID = Convert.ToInt16(httpRequest["RentalID"]);
                conplaint.DETAILS = httpRequest["Details"];
                conplaint.COMPLAINTSTATUSID = 1;
                conplaint.DATE = DateTime.Now;
                conplaint.PHOTO = imageName;

                var admin = db.EMPLOYEEs.Where(kk => kk.EMPLOYEETYPEID == 9).FirstOrDefault();

                //send email 
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add(admin.EMAIL.ToString());
                mail.Subject = "Complaint lodged ! ";
                mail.Body = "Good day " + admin.NAME + " " + admin.SURNAME + "\n\nThere is a new complaint that has to be reviewed and resolved,please have a look at it.\n\nThank you";

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
                db.COMPLAINTs.Add(conplaint);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return false;
                
            }

            return true;
        }

       

        

        



        [Route("DeleteComplaint/{ID}")]
        [HttpPost]
        public IHttpActionResult DeleteComplaint(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            COMPLAINT Delete = new COMPLAINT();
            Delete = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();
            if (Delete == null)
            {
                return NotFound();
            }
            db.COMPLAINTs.Remove(Delete);
            db.SaveChanges();

            return Ok(Delete);
        }

        [HttpGet]
        [Route("GetRentalAgreements/{ID}")]      
        public List<dynamic> GetRentalAgreements(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<RENTAL_AGREEMENT> rental = new List<RENTAL_AGREEMENT>();
            rental = db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == ID).ToList();
            if (rental == null)
            {
                return null;

            }

            List<dynamic> RentalList = new List<dynamic>();
            foreach(var x in rental)
            {
                dynamic rent = new ExpandoObject();
                rent.REFERENCE_NO = x.REFERENCE_NO;
                //rent.USERID = x.CLIENT.USERID;
                rent.CLIENTID = x.CLIENTID;
                rent.RENTALAGREEMENTID = x.RENTALAGREEMENTID;

                RentalList.Add(rent);
            }
            db.SaveChanges();

            return RentalList;
        }


        [Route("UpdateComplaint")]
        [HttpPost]
        public dynamic UpdateComplaint()
        {
            INF370Entities db = new INF370Entities();
            var httpRequest = HttpContext.Current.Request;
            string imageName = "";
            try
            {
                ////Upload Image
                ////var postedFile = httpRequest.Files["Image"];

                //string postedFile = complaint.Photo.tostring();
                ////int len = postedFile.le
                ////Create custom filename
                //imageName = new String(Path.GetFileNameWithoutExtension(postedFile).Take(postedFile.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile);
                //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile);
                //var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                //postedFile.SaveAs(filePath);

                //Upload Image
                var postedFile = httpRequest.Files["Image"];
                if (postedFile != null)
                {
                    //Create custom filename
                    imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(postedFile.FileName.Length).ToArray()).Replace(" ", "-") + Path.GetExtension(postedFile.FileName);
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                    var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                    postedFile.SaveAs(filePath);
                }

            }
            catch
            {
                return false;
            }

            COMPLAINT conplaint = new COMPLAINT();
            //Save to DB
            try
            {
                var ID = Convert.ToInt16(httpRequest["ComplaintID"]);
                COMPLAINT update = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();


                update.RENTALAGREEMENTID = Convert.ToInt16(httpRequest["RentalID"]);
                update.DETAILS = httpRequest["Details"];
                update.DATE = DateTime.Now;
                if (imageName != "")
                {
                    update.PHOTO = imageName;
                }



            }
            catch (Exception e)
            {
                return false;
            }


            try
            {
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return false;

            }

            return true;
        }



        [Route("getMyComplaint/{ID}")]
        [HttpPost]
        public List<dynamic> getMyComplaint(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> ComplaintList = new List<dynamic>();
            //COMPLAINT com = new COMPLAINT();

            try
            {

                var rental = db.RENTAL_AGREEMENT.Where(hh => hh.CLIENTID == ID).ToList();


                if (rental.Count != 0)
                {

                    var myComplaints =
                         (from x in db.COMPLAINTs.AsEnumerable()
                          join y in rental.AsEnumerable()
            on x.RENTALAGREEMENTID equals y.RENTALAGREEMENTID
                          //  where x.id.Equals(id)
                          select new COMPLAINT
                          {
                              RENTALAGREEMENTID = x.RENTALAGREEMENTID,
                              PHOTO = x.PHOTO,
                              COMPLAINTSTATUSID = x.COMPLAINTSTATUSID,
                              DETAILS = x.DETAILS,
                              DATE = x.DATE,
                              COMPLAINTID = x.COMPLAINTID,
                             




                          }).ToList();

                    foreach (var com in myComplaints)
                {
                    dynamic myCom = new ExpandoObject();
                        //com = db.COMPLAINTs.Where();



                        myCom.ComplaintID = com.COMPLAINTID;
                        COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                        var feedback = db.FEEDBACKs.Where(hh => hh.COMPLAINTID == com.COMPLAINTID).Select(kk => kk.FEEDBACKCOMMENT);
                        myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                        myCom.Date = com.DATE;
                        myCom.Details = com.DETAILS;
                        myCom.Photo = com.PHOTO;
                        myCom.RentalID = com.RENTALAGREEMENTID;
                        myCom.Feedback = feedback;
                     
                        if (com.PHOTO == "")
                        {
                            string filePath = HttpContext.Current.Server.MapPath("~/Images/notfound.png");
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    myCom.Photo = "data:image/png;base64," + base64String;
                                }
                            }

                        }
                        else
                        {
                            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    myCom.Photo = "data:image/png;base64," + base64String;
                                }
                            }
                        }
                        ComplaintList.Add(myCom);
                    }
      

          
                }

      
            }
            catch (Exception e)
            {
                return null;
            }
            return ComplaintList;
        }



        [Route("GetComplaintById/{ID}")]
        [HttpGet]
        public dynamic getComplaintById(int ID)
        {
            db.Configuration.ProxyCreationEnabled = false;
            COMPLAINT com = new COMPLAINT();
            dynamic myCom = new ExpandoObject();
            try
            {
                com = db.COMPLAINTs.Find(ID);

               

                myCom.ComplaintID = com.COMPLAINTID;
                COMPLAINTSTATU status = db.COMPLAINTSTATUS.Where(zz => zz.COMPLAINTSTATUSID == com.COMPLAINTSTATUSID).FirstOrDefault();
                myCom.ComplaintStatus = status.COMPLAINTSTATUS_NAME;
                myCom.Date = com.DATE;
                myCom.Details = com.DETAILS;
                myCom.Photo = com.PHOTO;
                myCom.RentalID = com.RENTALAGREEMENTID;
                string filePath = HttpContext.Current.Server.MapPath("~/Images/" + com.PHOTO);
                using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        fileStream.CopyTo(memoryStream);
                        Bitmap image = new Bitmap(1, 1);
                        image.Save(memoryStream, ImageFormat.Png);

                        byte[] byteImage = memoryStream.ToArray();
                        string base64String = Convert.ToBase64String(byteImage);
                        myCom.Photo = "data:image/png;base64," + base64String;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return myCom;
        }


        [HttpGet]
        [Route("GetAllEmployees")]
        public List<EMPLOYEE> GetAllEmployees()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.EMPLOYEEs.Where(zz => zz.EMPLOYEETYPEID == 3).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("Assign")]
        public dynamic Assign(dynamic Employee)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                //int EmployeeID = Convert.ToInt16(Employee.EMPLOYEEID);
                int ComplaintID = Convert.ToInt16(Employee.ComplaintID);

                COMPLAINT com = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ComplaintID).FirstOrDefault();
               // com.EMPLOYEEID = EmployeeID;
                com.COMPLAINTSTATUSID = 2;
                db.SaveChanges();


                var rentid = db.COMPLAINTs.Where(cc => cc.COMPLAINTID == ComplaintID).Select(kk => kk.RENTALAGREEMENTID).FirstOrDefault();
                var clntid = db.RENTAL_AGREEMENT.Where(cc => cc.RENTALAGREEMENTID == rentid).Select(kk => kk.CLIENTID);
                var cln = db.CLIENTs.Find(clntid);

                //send email 
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add(cln.EMAIL.ToString());
                mail.Subject = "Inturbidus: Complaint resolved ! ";
                mail.Body = "Good day " + cln.NAME + " " + cln.SURNAME + "\n\nYour complaint was recently resolved, we would appreciate your feedback.\n\nPlease navigate to the Complaints page and provide feedback on whether your complaint was resolved .\n\nThank you";

                SmtpServer.Port = 587;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }



        //[Route("api/Complaint/DeleteComplaint/{ID}")]
        //[HttpPost]
        //public IHttpActionResult DeleteComplaint(int ID)
        //{
        //    db.Configuration.ProxyCreationEnabled = false;
        //    COMPLAINT Delete = new COMPLAINT();
        //    Delete = db.COMPLAINTs.Where(zz => zz.COMPLAINTID == ID).FirstOrDefault();
        //    if (Delete == null)
        //    {
        //        return NotFound();
        //    }
        //    db.COMPLAINTs.Remove(Delete);
        //    db.SaveChanges();

        //    return Ok(Delete);
        //}


    }
}
