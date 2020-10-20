using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web;
using System.Dynamic;
using System.Data.Entity;
using System.Net.Mail;
using System.Text;
using System.Net.Http.Headers;
using System.IO;

namespace INF370_API.Controllers
{
 [RoutePrefix("Api/AddBooking")]
    public class AddbookingController : ApiController
    {
        INF370Entities db = new INF370Entities();
        [HttpPost]
        [Route("AddBooking")]
        public dynamic Addbooking(Addbooking sd)
        {


            //  var httpRequest = HttpContext.Current.Request;

            BOOKING booking = new BOOKING();
            EMPLOYEEDATETIMESLOT bookingUpdate = new EMPLOYEEDATETIMESLOT();






            //Save to DB
            try
            { var existing = db.BOOKINGs.Where(jj => jj.CLIENTID == sd.ClientID && jj.PROPERTYID == sd.PropertyID).ToList();
    

                if (existing.Count==0)
                { 
                booking.CLIENTID = sd.ClientID;
                booking.PROPERTYID = sd.PropertyID;
                var USERID = db.CLIENTs.Where(kk => kk.CLIENTID == sd.ClientID).Select(jj => jj.USERID).FirstOrDefault();                    
                booking.USERID = USERID;
                    //   booking.CLIENTID = Convert.ToInt32(httpRequest["CLIENTID"]);
                }
                else
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid = false;
                    return setInvalid;


                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
            }


            try
            {

                db.BOOKINGs.Add(booking);
                db.SaveChanges();

                bookingUpdate = db.EMPLOYEEDATETIMESLOTs.Find(sd.EmployeeDateTimeSlotID);
                int value = int.Parse(db.BOOKINGs
                            .OrderByDescending(p => p.BOOKINGID)
                            .Select(r => r.BOOKINGID)
                            .First().ToString());
                bookingUpdate.BOOKINGID = value;
                bookingUpdate.EMPLOYEESLOTSTAUSID = 2;


                db.SaveChanges();


                var emp = db.EMPLOYEEs.Where(hh => hh.EMPLOYEEID == bookingUpdate.EMPLOYEEID).FirstOrDefault();
                var theClient= db.CLIENTs.Where(hh => hh.CLIENTID == sd.ClientID).FirstOrDefault();
                var prop = db.PROPERTies.Where(hh => hh.PROPERTYID == sd.PropertyID).FirstOrDefault();
                var empslot = bookingUpdate.DATETIMESLOTID;
                var dateid = db.DATETIMESLOTs.Find(empslot);
                var date = db.DATEs.Where(kk => kk.DATEID == dateid.DATEID).Select(jj => jj.DATEDESCRIPTION).FirstOrDefault();
                var slotS = db.SLOTs.Where(kk => kk.SLOTID == dateid.SLOTID).FirstOrDefault();

                //send email with verification
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add(emp.EMAIL);
                mail.Subject = "Property Viewing Booking From: " + theClient.NAME + " " + theClient.SURNAME+ " "+theClient.PHONENUMBER;
                mail.Body = "Good day " + emp.NAME + " " + emp.SURNAME + "\n"+ theClient.NAME + " " + theClient.SURNAME+" would love to view the property at " + prop.ADDRESS + " with the property reference number "+ prop.PROPERTYID+". \nClient Details \nClient Name : " + theClient.NAME+" "+ theClient.SURNAME + "\nClient Email:"+theClient.EMAIL + "\nClient Number:" +theClient.PHONENUMBER+"\nViewing Details \nDate and Time of viewing : " + date +" "+ DateTime.Now.Year.ToString()+ " \nFrom: " + slotS.STARTTIME+ "-"+ slotS.ENDTIME + " \n\nThank you  ";

                SmtpServer.Port = 587;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);















            }
            catch (Exception )
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking "); ;
            }


            //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
            return Request.CreateResponse(HttpStatusCode.Created);

        }


   

            
        [HttpGet]
        [Route("Test")]

        public string Test()
        {

            INF370Entities db = new INF370Entities();
            Random r = new Random();
            string OTP = r.Next(1000, 9999).ToString();

            String result;
            string apiKey = "f9iIBpdM9yQ-bF62aeYpS72ocjyQtPTJH03ddDXGm8";
            string numbers = "825249706"; // in a comma seperated list
            string message = OTP;
            string sender = "Jims Autos";

            String url = "https://api.txtlocal.com/send/?apikey=" + apiKey + "&numbers=" + numbers + "&message=" + message + "&sender=" + sender;
            //refer to parameters to complete correct url string

            StreamWriter myWriter = null;
            HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);

            objRequest.Method = "POST";
            objRequest.ContentLength = Encoding.UTF8.GetByteCount(url);
            objRequest.ContentType = "application/x-www-form-urlencoded";
            try
            {
                myWriter = new StreamWriter(objRequest.GetRequestStream());
                myWriter.Write(url);
            }
            catch (Exception e)
            {
                return e.Message;
            }
            finally
            {
                myWriter.Close();
            }

            HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
            using (StreamReader sr = new StreamReader(objResponse.GetResponseStream()))
            {
                result = sr.ReadToEnd();
                // Close and clean up the StreamReader
                sr.Close();
            }
            return result;
   

        }









        public int getCreatedBookingID()
        {

            var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

            return 1;
        }




        [HttpGet]
        [Route("MySlots/{ID}")]

        public List<dynamic> MySlots(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                var bookings = db.BOOKINGs.Where(mm => mm.USERID == ID).ToList();
                var mybookings =
             (from x in db.EMPLOYEEDATETIMESLOTs.AsEnumerable()
              join y in bookings.AsEnumerable()
on x.BOOKINGID equals y.BOOKINGID
                  //  where x.id.Equals(id)
                  select new EMPLOYEEDATETIMESLOT
              {
                  EMPLOYEEDATETIMESLOTID = x.EMPLOYEEDATETIMESLOTID,
                  EMPLOYEEID = x.EMPLOYEEID,
                  DATETIMESLOTID = x.DATETIMESLOTID

              }).ToList();
                return GetMySlots(mybookings);
            }
            catch (Exception)
            {

                return null;
            }

        
           

        }
        private List<dynamic> GetMySlots(List<EMPLOYEEDATETIMESLOT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEEDATETIMESLOT Jb in forbros)
            { var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                var date = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                var fulldate = Convert.ToDateTime(date + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                if (Convert.ToDateTime(fulldate) > DateTime.Today)
                {
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.EmployeeDateTimeSLotID = db.EMPLOYEEDATETIMESLOTs.Where(zz => zz.EMPLOYEEDATETIMESLOTID == Jb.EMPLOYEEDATETIMESLOTID).Select(zz => zz.EMPLOYEEDATETIMESLOTID).FirstOrDefault();
                    dynamicjob.Name = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.NAME).FirstOrDefault();
                    dynamicjob.Surname = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.SURNAME).FirstOrDefault();
                    dynamicjob.PhoneNumber = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.PHONE_NUMBER).FirstOrDefault();
                    var DateID = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                    dynamicjob.Date = db.DATEs.Where(zz => zz.DATEID == DateID).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                    var SlotID = db.DATETIMESLOTs.Include(zz => zz.SLOT).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.SLOTID).FirstOrDefault();
                    dynamicjob.Startime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.STARTTIME).FirstOrDefault();
                    dynamicjob.Endtime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.ENDTIME).FirstOrDefault();
                    dynamicjobs.Add(dynamicjob);
                }
            }
            return dynamicjobs;
        }

        [HttpGet]
        [Route("MySlotsCalendar/{ID}")]

        public List<dynamic> MySlotsCalendar(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

         
            var bookings = db.BOOKINGs.Where(mm => mm.USERID == ID).ToList();

            var mybookings =
                 (from x in db.EMPLOYEEDATETIMESLOTs.AsEnumerable()
                  join y in bookings.AsEnumerable()
    on x.BOOKINGID equals y.BOOKINGID
                  //  where x.id.Equals(id)
                  select new EMPLOYEEDATETIMESLOT
                  {
                      EMPLOYEEDATETIMESLOTID = x.EMPLOYEEDATETIMESLOTID,
                      EMPLOYEEID = x.EMPLOYEEID,
                      DATETIMESLOTID = x.DATETIMESLOTID,
                      BOOKINGID= x.BOOKINGID

                  }).ToList();
            return MySlotsCalendars(mybookings);
            }
            catch (Exception)
            {

                return null;
            }
        }
        private List<dynamic> MySlotsCalendars(List<EMPLOYEEDATETIMESLOT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEEDATETIMESLOT Jb in forbros)
            { var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                var date = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                var fulldate = Convert.ToDateTime(date + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                if (Convert.ToDateTime(fulldate) > DateTime.Today)
                {
                    dynamic dynamicjob = new ExpandoObject();
                    var empslot = db.EMPLOYEEDATETIMESLOTs.Where(zz => zz.EMPLOYEEDATETIMESLOTID == Jb.EMPLOYEEDATETIMESLOTID).Select(zz => zz.EMPLOYEEDATETIMESLOTID).FirstOrDefault();
                    var name = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.NAME).FirstOrDefault();
                    var Surname = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.SURNAME).FirstOrDefault();
                    var PhoneNumber = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.PHONE_NUMBER).FirstOrDefault();
                    var DateID = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                    var Date = db.DATEs.Where(zz => zz.DATEID == DateID).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                    var SlotID = db.DATETIMESLOTs.Include(zz => zz.SLOT).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.SLOTID).FirstOrDefault();
                    var Startime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.STARTTIME).FirstOrDefault();
                    var Endtime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.ENDTIME).FirstOrDefault();
                    var bookingid = db.EMPLOYEEDATETIMESLOTs.Where(oo => oo.BOOKINGID == Jb.BOOKINGID).Select(jj => jj.BOOKINGID).FirstOrDefault();
                    var pId = db.BOOKINGs.Where(hh => hh.BOOKINGID == bookingid).Select(hh => hh.PROPERTYID).FirstOrDefault();
                    var place = db.PROPERTies.Where(hh => hh.PROPERTYID == pId).Select(kk => kk.ADDRESS).FirstOrDefault();


                    var year = DateTime.Now.Year;
                    string friendDate = Convert.ToDateTime(Date + " " + year).ToString("yyyy-MM-dd");
                    var random = new Random();
                    var color = String.Format("#{0:X6}", random.Next(0x1000000));

                    dynamicjob.text = "Property viewing with " + name + "" + Surname + " on " + Date + " " + year + " " + Startime + "-" + Endtime + " @ " + place;
                    dynamicjob.start = friendDate + "T08:00:00.000Z";
                    dynamicjob.end = friendDate + "T09:00:00.000Z";
                    dynamicjob.color = color;

                    dynamicjobs.Add(dynamicjob);
                }
            }
            return dynamicjobs;
        }







        [HttpGet]
        [Route("ExportMySlotsCalendar/{ID}")]

        public string ExportMySlotsCalendar(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

            var bookings = db.BOOKINGs.Where(mm => mm.USERID == ID).ToList();

            var mybookings =
                 (from x in db.EMPLOYEEDATETIMESLOTs.AsEnumerable()
                  join y in bookings.AsEnumerable()
    on x.BOOKINGID equals y.BOOKINGID
                  //  where x.id.Equals(id)
                  select new EMPLOYEEDATETIMESLOT
                  {
                      EMPLOYEEDATETIMESLOTID = x.EMPLOYEEDATETIMESLOTID,
                      EMPLOYEEID = x.EMPLOYEEID,
                      DATETIMESLOTID = x.DATETIMESLOTID,
                      BOOKINGID = x.BOOKINGID

                  }).ToList();








            return ExportMySlotsCalendars(mybookings);

            }
            catch (Exception)
            {

                return null;
            }
        }


        private string ExportMySlotsCalendars(List<EMPLOYEEDATETIMESLOT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
     

                StringBuilder strResult = new StringBuilder();

            strResult.Append("BEGIN:VCALENDAR\nPRODID: -//Google Inc//Google Calendar 70.9054//EN\nVERSION:2.0\nCALSCALE: GREGORIAN\nMETHOD: PUBLISH\nX - WR - CALNAME:ECML PKDD 2015\nX - WR - TIMEZONE:Europe / Lisbon\nBEGIN:VTIMEZONE\nTZID:Europe/Lisbon\nX-LIC-LOCATION:Europe/Lisbon\nBEGIN:STANDARD\nTZOFFSETFROM:+0100\nTZOFFSETTO:+0000\nTZNAME:WETDTSTART:19701025T020000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZOFFSETFROM:+0000\nTZOFFSETTO:+0100\nTZNAME:WEST\nDTSTART:19700329T010000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU\nEND:DAYLIGHT\nEND:VTIMEZONE\n");

            //strResult.Append("BEGIN:VCALENDAR");
            //    strResult.Append("PRODID:-//Google Inc//Google Calendar 70.9054//EN");
            //    strResult.Append("VERSION:2.0");
            //    strResult.Append("METHOD:PUBLISH");


                foreach (var Jb in forbros)
                {
                var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                var date = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                var fulldate = Convert.ToDateTime(date + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                if (Convert.ToDateTime(fulldate) > DateTime.Today)
                {
                    var empslot = db.EMPLOYEEDATETIMESLOTs.Where(zz => zz.EMPLOYEEDATETIMESLOTID == Jb.EMPLOYEEDATETIMESLOTID).Select(zz => zz.EMPLOYEEDATETIMESLOTID).FirstOrDefault();
                    var name = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.NAME).FirstOrDefault();
                    var Surname = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.SURNAME).FirstOrDefault();
                    var PhoneNumber = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == Jb.EMPLOYEEID).Select(zz => zz.PHONE_NUMBER).FirstOrDefault();
                    var DateID = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                    var Date = db.DATEs.Where(zz => zz.DATEID == DateID).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                    var SlotID = db.DATETIMESLOTs.Include(zz => zz.SLOT).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.SLOTID).FirstOrDefault();
                    var Startime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.STARTTIME).FirstOrDefault();
                    var Endtime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.ENDTIME).FirstOrDefault();
                    var bookingid = db.EMPLOYEEDATETIMESLOTs.Where(oo => oo.BOOKINGID == Jb.BOOKINGID).Select(jj => jj.BOOKINGID).FirstOrDefault();
                    var pId = db.BOOKINGs.Where(hh => hh.BOOKINGID == bookingid).Select(hh => hh.PROPERTYID).FirstOrDefault();
                    var place = db.PROPERTies.Where(hh => hh.PROPERTYID == pId).Select(kk => kk.ADDRESS).FirstOrDefault();
                    var year = DateTime.Now.Year;

                    var text = "Property viewing with " + name + "" + Surname + " @ " + place;


                    var dt = DateTime.Now;

                    string yearDate = Convert.ToDateTime(Date + " " + year).ToString("yyyy/MM/dd");
                    string Startdatetime = Convert.ToDateTime(yearDate + " " + Startime + ":00").ToString("yyyyMMddTHHmmss");
                    string Enddatetime = Convert.ToDateTime(yearDate + " " + Endtime + ":00").ToString("yyyyMMddTHHmmss");


                    //string friendDate = Convert.ToDateTime(Date + " " + year+" "+ Startime+":00").ToString("yyyyMMddTHHmmssZ");
                    //string EndfriendDate = Convert.ToDateTime(Date + " " + year + "T" + Endtime).ToString("yyyyMMddTHHmmssZ");

                    var random = new Random();
                    var color = String.Format("#{0:X6}", random.Next(0x1000000));







                    strResult.Append("BEGIN:VEVENT\n");
                    strResult.Append(string.Format("DTSTART:{0:yyyyMMddTHHmmss}", Startdatetime + "\n"));
                    strResult.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmss}", DateTime.UtcNow));
                    strResult.Append(string.Format("DTEND:{0:yyyyMMddTHHmmss}", Enddatetime + "\n"));
                    strResult.AppendLine("LOCATION:" + place);
                    strResult.AppendLine(string.Format("UID:{0}", Guid.NewGuid()));
                    strResult.AppendLine(string.Format("DESCRIPTION:{0}", text));

                    strResult.Append("SEQUENCE:0\n");

                    strResult.Append("STATUS:CONFIRMED\n");
                    strResult.Append("SUMMARY:Property Viewing\n");
                    //strResult.Append("SUMMARY:" & rst1.getString("hly_name") & vbCrLf)

                    //strResult.Append("UID:" & System.Guid.NewGuid.ToString() & vbCrLf)

                    strResult.Append("CLASS:PUBLIC\n");


                    strResult.Append("TRANSP:OPAQUE\n");
                    strResult.AppendLine("BEGIN:VALARM");
                    strResult.AppendLine(string.Format("DESCRIPTION:{0}", text));

                    strResult.AppendLine("TRIGGER:-PT15M");
                    strResult.AppendLine("ACTION:DISPLAY");
                    //strResult.AppendLine("\n");

                    //strResult.AppendLine("DESCRIPTION:Reminder");
                    strResult.AppendLine("END:VALARM");
                    strResult.AppendLine("END:VEVENT");



                }
            }
                strResult.Append("END:VCALENDAR");
                //create a string from the stringbuilder
                string CalendarItem = strResult.ToString();

                byte[] calendarBytes = System.Text.Encoding.UTF8.GetBytes(CalendarItem); //iCal is the calendar string
                //return File(calendarBytes, "text/calendar", "event.ics");

               

                //Create HTTP Response.
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);



                //Set the Response Content.
                response.Content = new ByteArrayContent(calendarBytes);

                //Set the Response Content Length.
                response.Content.Headers.ContentLength = calendarBytes.LongLength;

            //Set the Content Disposition Header Value and FileName.
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = "MyBookings";


          
            return CalendarItem;

        }




        [HttpPost]
    [Route("DeleteBooking")]
    public HttpResponseMessage DeleteBooking(UpdateBooking sd)
    {


        

        EMPLOYEEDATETIMESLOT bookingUpdate = new EMPLOYEEDATETIMESLOT();

        try
        {


            bookingUpdate = db.EMPLOYEEDATETIMESLOTs.Find(sd.BookingID);
            bookingUpdate.BOOKINGID = null;
            bookingUpdate.EMPLOYEESLOTSTAUSID = 1;


            db.SaveChanges();

        }
        catch (Exception )
        {
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
        }


        //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
        return Request.CreateResponse(HttpStatusCode.Created);

    }


        [HttpPost]
        [Route("UpdateBooking")]
        public HttpResponseMessage UpdateBooking(UpdateBooking sd)
        {




            EMPLOYEEDATETIMESLOT bookingUpdate = new EMPLOYEEDATETIMESLOT();
            EMPLOYEEDATETIMESLOT bookingUpdate2 = new EMPLOYEEDATETIMESLOT();
            try
            {

                var bookingID= db.EMPLOYEEDATETIMESLOTs.Where(vvs => vvs.EMPLOYEEDATETIMESLOTID== sd.EmployeeDateTimeSlotID).Select(hh=>hh.BOOKINGID).FirstOrDefault();
                bookingUpdate = db.EMPLOYEEDATETIMESLOTs.Find(sd.EmployeeDateTimeSlotID);
                bookingUpdate.BOOKINGID = null;
                bookingUpdate.EMPLOYEESLOTSTAUSID = 1;

                bookingUpdate2= db.EMPLOYEEDATETIMESLOTs.Find(sd.newEmployeeDateTimeSlotID);
                bookingUpdate2.BOOKINGID = bookingID;
                bookingUpdate2.EMPLOYEESLOTSTAUSID = 2;

                db.SaveChanges();

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With Booking ");
            }


            //booking.BOOKINGID = getCreatedBookingID(booking.CLIENTID);
            return Request.CreateResponse(HttpStatusCode.Created);

        }





        public int getCreateddBookingID()
    {

        var toReturn = db.BOOKINGs.Skip(db.BOOKINGs.Count() - 1).FirstOrDefault();

        return 1;
    }
}
}

