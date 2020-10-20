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
using System.Net.Mail;
using System.Globalization;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/Maintenance")]
    public class MaintenanceController : ApiController
    {

        INF370Entities db = new INF370Entities();

        INF370Entities abc = new INF370Entities();

        [HttpGet]
        [Route("GetAssignedJobs/{ID}")]
        public List<dynamic> GetAssignedJobs(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAssignedJobs(db.JOBs.Include(ZZ => ZZ.RENTAL_AGREEMENT).Where(zz => zz.JOBSTATUSID == 2 &&zz.EMPLOYEEID==ID).ToList()); //zz.JOBTYPEID == 1 Maintenance guy does both repair and maintain

        }
        private List<dynamic> GetAssignedJobs(List<JOB> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (JOB Jb in forbros)
            {

                var Rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == Jb.RENTALAGREEMENTID).FirstOrDefault();

                //List<PROPERTY> Prop = new List<PROPERTY>();
                var Prop = db.PROPERTies.ToList();
                var usr = db.USERs.ToList();
                var stat = db.JOBSTATUS.ToList();
                var clientID = Rent.CLIENTID;
                

                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.JOBID = Jb.JOBID;
                dynamicjob.ADDRESS = Prop.Where(zz => zz.PROPERTYID == Rent.PROPERTYID).Select(x => x.ADDRESS).FirstOrDefault();
                dynamicjob.RENTALAGREEMENTID = Jb.RENTALAGREEMENTID;
                // dynamicjob.USERNAME = usr.Where(cc => cc.EMPLOYEEID == Jb.EMPLOYEEID).Select(a => a.USERNAME).FirstOrDefault();
                dynamicjob.JOBTYPE = db.JOBTYPEs.Where(dd => dd.JOBTYPEID == Jb.JOBTYPEID).Select(dd => dd.JOBTYPEDESCRIPTION);
                dynamicjob.EMPLOYEEID = Jb.EMPLOYEEID;
                dynamicjob.JOBSTATUS = stat.Where(aa => aa.JOBSTATUSID == Jb.JOBSTATUSID).Select(c => c.DESCRIPTION).FirstOrDefault();
                dynamicjob.DATEREQUESTED = Jb.DATEREQUESTED;
                dynamicjob.DESCRIPTION = Jb.DESCRIPTION;
                dynamicjob.DATECOMPLETED = Jb.DATECOMPLETED;
                dynamicjob.CLIENTNAME = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.NAME);
                dynamicjob.CLIENTSURNAME = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.SURNAME);
                dynamicjob.CLIENTNUMBER = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.PHONENUMBER);

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

        [HttpPost]
        [Route("InsertItemsDetails")]
        public IHttpActionResult PostItems(ITEM data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.ITEMs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertSupplierDetails")]
        public IHttpActionResult PostSupplier(SUPPLIER data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.SUPPLIERs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertPurchaseDetails")]
        public IHttpActionResult Postpurchase(PURCHASE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PURCHASEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertPurchaselineDetails")]
        public IHttpActionResult Postpurchaseline(PURCHASELINE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PURCHASELINEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
                ;
            }

            return Ok(data);
        }
        [HttpGet]
        [Route("Getitems")]
        public List<dynamic> Getitems()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return getpurchaseitems(db.ITEMs.ToList());

        }
        private List<dynamic> getpurchaseitems(List<ITEM> forbros)
        {
            List<dynamic> dynamicItems = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            var pur = db.PURCHASEs.ToList();
            foreach (ITEM Jb in forbros)
            {



                dynamic dynamicItem = new ExpandoObject();
                dynamicItem.ITEMID = Jb.ITEMID;
                dynamicItem.NAME = Jb.NAME;
                dynamicItem.DESCRIPTION = Jb.DESCRIPTION;
                dynamicItems.Add(dynamicItem);
            }
            return dynamicItems;
        }
        [HttpGet]
        [Route("GetAllPurchases")]
        public List<PURCHASE> GetAllPurchases()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PURCHASEs.ToList();
            }
            catch (Exception)
            {
                return null;

            }
        }


        [HttpGet]
        [Route("GetAllSuppliers")]
        public List<SUPPLIER> GetAllSuppliers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.SUPPLIERs.ToList();
            }
            catch (Exception)
            {
                return null;

            }
        }


        [HttpGet]
        [Route("GetPurchaseLine")]
        public List<PURCHASELINE> GetPurchaseLine()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PURCHASELINEs.ToList();
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("getSupplierById/{SUPPLIERID}")]
        public IHttpActionResult getSupplierById(string SUPPLIERID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            SUPPLIER abc = new SUPPLIER();
    
            try
            {
                int ID = Convert.ToInt32(SUPPLIERID);
                abc = db.SUPPLIERs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(abc);
        }
        [HttpGet]
        [Route("getPurchaseById/{PURCHASEID}")]
        public IHttpActionResult getPurchaseById(string PURCHASEID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            PURCHASE abc = new PURCHASE();
           
            try
            {
                int ID = Convert.ToInt32(PURCHASEID);
                abc = db.PURCHASEs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(abc);
        }

        [HttpPost]
        [Route("InsertDateDetails")]
        public IHttpActionResult PostDate(DATE data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.DATEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(data);
        }
        [HttpPost]
        [Route("InsertSlotDetails")]
        public IHttpActionResult PostSlot(SLOT data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.SLOTs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("GetDate")]
        public dynamic GetDate()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                DateTime startOfWeek = DateTime.Today.AddDays(
       (int)CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek -
       (int)DateTime.Today.DayOfWeek);

                string result = string.Join("," , Enumerable
                  .Range(7,7)
                  .Select(i => startOfWeek
                     .AddDays(i)
                     .ToString("d MMMM")));


                var dates = db.DATEs.ToList();
                var selected = (from pd in dates
                            join od in result.Split(',').ToList() on pd.DATEDESCRIPTION  equals od.ToString()

                            select new
                            {
                                DATEDESCRIPTION= pd.DATEDESCRIPTION,
                                DATEID= pd.DATEID,
                                
                            }).ToList();

                List<DATE> date = new List<DATE>();
                foreach (var xx in selected)
                {

                    var fulldate = Convert.ToDateTime(xx.DATEDESCRIPTION + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                    if (Convert.ToDateTime(fulldate) > DateTime.Today)
                    {
                        DATE day = new DATE();
                        day.DATEDESCRIPTION = xx.DATEDESCRIPTION;
                        day.DATEID = xx.DATEID;
                        date.Add(day);

                    }

                }

               
                //List<DATE> dates = new List<DATE>();
                //List<DATE> da = result.Split(',').ToList();
                //foreach (var x in result.ToList())

                //{
                //    DATE date = new DATE();

                //    date.DATEDESCRIPTION=db.DATEs.Where(jj=>jj.DATEDESCRIPTION==x)                  
                //    dates.Add(date);

                //}


                //            var query = db.DATEs
                //.Where(item => item.DATEDESCRIPTION.Any(j => dates.Contains(j.ToString())));

                return date;
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

        }


        [HttpGet]
        [Route("GetSlot")]
        public List<dynamic> GetSlot()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetSlots(db.SLOTs.ToList());

        }
        private List<dynamic> GetSlots(List<SLOT> forbros)
        {
            List<dynamic> dynamicslots = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (SLOT st in forbros)
            {



                dynamic dynamicslot = new ExpandoObject();
                dynamicslot.SLOTID = st.SLOTID;
                dynamicslot.STARTTIME = st.STARTTIME;
                dynamicslot.ENDTIME = st.ENDTIME;
                dynamicslots.Add(dynamicslot);
            }
            return dynamicslots;
        }


        [HttpGet]
        [Route("GetDatetimeslot")]
        public List<dynamic> GetDatetimeslot()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetDatetimeslots(db.DATETIMESLOTs.Include(aa => aa.DATE).Where(zz => zz.DATE.DATEDESCRIPTION ==null).ToList()); //change back 

        }
        private List<dynamic> GetDatetimeslots(List<DATETIMESLOT> forbros)
        {
            List<dynamic> dynamicslots = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (DATETIMESLOT st in forbros)
            {

                var slot = db.SLOTs.Where(zz => zz.SLOTID == st.SLOTID).FirstOrDefault();

                dynamic dynamicslot = new ExpandoObject();
                dynamicslot.DATETIMESLOTID = st.DATETIMESLOTID;
                dynamicslot.SLOTID = st.SLOTID;
                dynamicslot.DATEID = st.DATEID;
                dynamicslot.DATEDESCRIPTION = st.DATE.DATEDESCRIPTION;
                dynamicslot.STARTTIME = slot.STARTTIME;
                dynamicslot.ENDTIME = slot.ENDTIME;



                dynamicslots.Add(dynamicslot);
            }
            return dynamicslots;
        }

        [HttpPost]
        [Route("InsertDatetimeslot")]
        public IHttpActionResult PostDateSlot(EMPLOYEEDATETIMESLOT data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                data.EMPLOYEESLOTSTAUSID = 1;
                db.EMPLOYEEDATETIMESLOTs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(data);
        }


        [HttpPost]
        [Route("InsertDatetimeDetails")]
        public IHttpActionResult PostDateSlot(EmpSlot data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var date = db.DATETIMESLOTs.Where(kk => kk.DATEID == data.DateID  && kk.SLOTID == data.SlotID).ToList();
                if(date.Count==0)
                {
                    DATETIMESLOT DATETIMESLOT = new DATETIMESLOT();
                    DATETIMESLOT.DATEID = data.DateID;
                    DATETIMESLOT.SLOTID = data.SlotID;
                    DATETIMESLOT.AREAID = data.AreaID;


                    db.DATETIMESLOTs.Add(DATETIMESLOT);
                    db.SaveChanges();

                }
                else { return Ok(false); }

              


                int value = int.Parse(db.DATETIMESLOTs
                          .OrderByDescending(p => p.DATETIMESLOTID)
                          .Select(r => r.DATETIMESLOTID)
                          .First().ToString());


                EMPLOYEEDATETIMESLOT EMPLOYEEDATETIMESLOT = new EMPLOYEEDATETIMESLOT();
                EMPLOYEEDATETIMESLOT.EMPLOYEEID = data.EmployeeID;
                EMPLOYEEDATETIMESLOT.EMPLOYEESLOTSTAUSID = 1;
                EMPLOYEEDATETIMESLOT.DATETIMESLOTID = value;

                db.EMPLOYEEDATETIMESLOTs.Add(EMPLOYEEDATETIMESLOT);
                db.SaveChanges();

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(data);
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
                          BOOKINGID = x.BOOKINGID

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
            {
                var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
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
        [Route("GetMySlots/{ID}")]
        public List<dynamic> GetMySlots(int ID)
        {

            db.Configuration.ProxyCreationEnabled = false;
            var objEmp = new List<EMPLOYEEDATETIMESLOT>();
            try
            {
                
                objEmp = db.EMPLOYEEDATETIMESLOTs.Where(kk=>kk.EMPLOYEEID==ID).ToList();

                var mybookings =
       (from x in objEmp.AsEnumerable()
        join y in db.DATETIMESLOTs.AsEnumerable()
on x.DATETIMESLOTID equals y.DATETIMESLOTID
        select new 
        {
            EMPLOYEEID=x.EMPLOYEEID,
            EMPLOYEEDATETIMESLOTID=x.EMPLOYEEDATETIMESLOTID,

            DATETIMESLOTID = y.DATETIMESLOTID,
            DATEID = y.DATEID,
            AREAID = y.AREAID,

            SLOTID = y.SLOTID

              }).ToList();

                List<dynamic> dynamicjobs = new List<dynamic>();
                List<dynamic> dynamicevents = new List<dynamic>();
                List<dynamic> Lists = new List<dynamic>();



                foreach (var cc in mybookings )
                { 
                var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == cc.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                var dat = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                var fulldate = Convert.ToDateTime(dat + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                if (Convert.ToDateTime(fulldate) > DateTime.Today)
                    {
                        dynamic dynamicjob = new ExpandoObject();
                        dynamic dynamicevent = new ExpandoObject();

                        dynamicjob.EmployeeDateTimeSLotID = db.EMPLOYEEDATETIMESLOTs.Where(zz => zz.EMPLOYEEDATETIMESLOTID == cc.EMPLOYEEDATETIMESLOTID).Select(zz => zz.EMPLOYEEDATETIMESLOTID).FirstOrDefault();



                        dynamicjob.Area = db.AREAs.Where(ll => ll.AREAID == cc.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
                         var hh= db.EMPLOYEEDATETIMESLOTs.Where(ll=>ll.EMPLOYEEDATETIMESLOTID==cc.EMPLOYEEDATETIMESLOTID).Select(zz => zz.EMPLOYEESLOTSTAUSID).FirstOrDefault();
                        dynamicjob.Status = db.EMPLOYEESLOTSTATUS.Where(pp => pp.EMPLOYEESLOTSTAUSID == hh).Select(kk => kk.EMPLOYEESLOTSTATUSDESCR).FirstOrDefault();
                       var DateID = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == cc.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                        dynamicjob.Date = db.DATEs.Where(zz => zz.DATEID == DateID).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                        var SlotID = db.DATETIMESLOTs.Include(zz => zz.SLOT).Where(zz => zz.DATETIMESLOTID == cc.DATETIMESLOTID).Select(zz => zz.SLOTID).FirstOrDefault();
                        dynamicjob.Startime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.STARTTIME).FirstOrDefault();
                        dynamicjob.Endtime = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.ENDTIME).FirstOrDefault();
                        var year = DateTime.Now.Year;
                        string friendDate = Convert.ToDateTime(dynamicjob.Date + " " + year).ToString("yyyy-MM-dd");
                        var random = new Random();
                        var color = String.Format("#{0:X6}", random.Next(0x1000000));
                        var mystart = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.STARTTIME).FirstOrDefault();
                        var myend = db.SLOTs.Where(zz => zz.SLOTID == SlotID).Select(zz => zz.ENDTIME).FirstOrDefault();

                        dynamicevent.text = "Property viewing on " + dynamicjob.Date + " " + year + " @ " + dynamicjob.Area;
                        dynamicevent.start = friendDate +"T"+ mystart.Substring(0,2) + ":00:00.000Z";
                        dynamicevent.end = friendDate + "T" + myend.Substring(0, 2) + ":00:00.000Z";
                        dynamicevent.color = color;


                        dynamicevents.Add(dynamicevent);
                        dynamicjobs.Add(dynamicjob);

                       



                        var empslot =
  (from x in objEmp.AsEnumerable()
   join y in db.DATETIMESLOTs.AsEnumerable()
on x.DATETIMESLOTID equals y.DATETIMESLOTID
        //  where x.id.Equals(id)
        select new DATETIMESLOT
   {

       DATETIMESLOTID = y.DATETIMESLOTID,
       DATEID = y.DATEID,

       SLOTID = y.SLOTID

   }).ToList();

                    }

                }

                Lists.Add(dynamicjobs);
                Lists.Add(dynamicevents);



                return Lists;





                var dates =
(from x in mybookings.AsEnumerable()
join y in db.DATEs.AsEnumerable()
on x.DATEID equals y.DATEID
        //  where x.id.Equals(id)
        select new DATE
{

            DATEDESCRIPTION = y.DATEDESCRIPTION,
DATEID = y.DATEID,



}).ToList();







                List<DATE> date = new List<DATE>();
                foreach (var xx in mybookings)
                {

                    //var fulldate = Convert.ToDateTime(xx.DATEDESCRIPTION + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                    //if (Convert.ToDateTime(fulldate) > DateTime.Today)
                    //{
                    //    DATE day = new DATE();
                    //    day.DATEDESCRIPTION = xx.DATEDESCRIPTION;
                    //    day.DATEID = xx.DATEID;
                    //    date.Add(day);

                    //}

                }


                if (objEmp == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid = false;
                    return setInvalid;
                }

            }
            catch (Exception)
            {
                return null;

            }

        
        }
















        [HttpGet]
        [Route("SlotById/{SLOTID}")]
        public IHttpActionResult getSlotById(string SLOTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            SLOT abc = new SLOT();
           
            try
            {
                int ID = Convert.ToInt32(SLOTID);
                abc = db.SLOTs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(abc);
        }
        [HttpGet]
        [Route("DatetimeslotbyId/{DATETIMESLOTID}")]
        public IHttpActionResult DatetimeslotbyId(string DATETIMESLOTID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            DATETIMESLOT abc = new DATETIMESLOT();
            try
            {
                int ID = Convert.ToInt32(DATETIMESLOTID);

                abc = db.DATETIMESLOTs.Find(ID);
                if (abc == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }

            return Ok(abc);
        }

        [HttpPut]
        [Route("UpdateJobDetails/{ID}")]
        public IHttpActionResult PutjobMaster(int ID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                JOB objjob = new JOB();
                objjob = abc.JOBs.Find(ID);
                if (objjob != null)
                {
                    //objjob.JOBID = job.JOBID;
                    //objjob.JOBTYPEID = job.JOBTYPEID;
                    //objjob.RENTALAGREEMENTID = job.RENTALAGREEMENTID;
                    objjob.JOBSTATUSID = 3;
                    //objjob.DATEREQUESTED = job.DATEREQUESTED;
                    //objjob.DESCRIPTION = job.DESCRIPTION;
                    objjob.DATECOMPLETED = DateTime.Today;




                }
                int i = this.abc.SaveChanges();
                try
                {

                    var jb = db.JOBs.Where(zz => zz.JOBID == objjob.JOBID).FirstOrDefault();
                    var rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == objjob.RENTALAGREEMENTID).FirstOrDefault();
                    var prop = db.PROPERTies.Where(zz => zz.PROPERTYID == rent.PROPERTYID).FirstOrDefault();
                    var cln = db.CLIENTs.Where(zz => zz.CLIENTID == rent.CLIENTID).FirstOrDefault();
                    var email = cln.EMAIL;
                    //send email with verification OTP
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(email.ToString());
                    mail.Subject = "Job Completed";
                    mail.Body = "Good day" + cln.NAME + " " + cln.SURNAME + "\n You Repair request has been completed. At the Adress: " + prop.ADDRESS + " Please give feedback if the repair job was satisfactory or not. ";

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
            return Ok();
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        //Imported from test controller

        ////////////////////////////////

        [Route("GetCities/{ID}")]
        [HttpGet]
        public List<dynamic> GetCities(int ID)
        {
            var cities = db.CITies.Where(kk => kk.PROVINCEID == ID).ToList();

            List<dynamic> toReturn = new List<dynamic>();
            //dynamic dynamicPropertyAny = new ExpandoObject();
            //dynamicPropertyAny.ID = "";
            //dynamicPropertyAny.Name = "All";
            //toReturn.Add(dynamicPropertyAny);
            foreach (CITY city in cities)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.CITYID;
                dynamicProperty.Name = city.CITYNAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("GetAreas/{ID}")]
        [HttpGet]
        public List<dynamic> GetAreas(int ID)
        {
            var areas = db.AREAs.Where(hh => hh.CITYID == ID).ToList();

            List<dynamic> toReturn = new List<dynamic>();
            //dynamic dynamicPropertyAny = new ExpandoObject();
            //dynamicPropertyAny.ID = "";
            //dynamicPropertyAny.Name = "All";
            //toReturn.Add(dynamicPropertyAny);
            foreach (AREA city in areas)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.AREAID;
                dynamicProperty.Name = city.AREANAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("GetProvinces")]
        [HttpGet]
        public List<dynamic> GetProvinces()
        {
            var provinces = db.PROVINCEs.ToList();

            List<dynamic> toReturn = new List<dynamic>();

            foreach (PROVINCE city in provinces)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.PROVINCEID;
                dynamicProperty.Name = city.PROVINCENAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;
        }






        [Route("Test")]
        [HttpPost]
        public dynamic Test(string data)

        {
            var cultureInfo = new CultureInfo("en-US");
            DateTime date = DateTime.ParseExact(data, "D", cultureInfo);
            return date;
        }

        [HttpPut]
        [Route("UpdateSlotDetails")]
        public IHttpActionResult PutSlotMaster(SLOT supp)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SLOT objsup = new SLOT();
                objsup = db.SLOTs.Find(supp.SLOTID);
                if (objsup != null)
                {
                    objsup.SLOTID = supp.SLOTID;
                    objsup.STARTTIME = supp.STARTTIME;
                    objsup.ENDTIME = supp.ENDTIME;

                }
                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return Ok(supp);
        }
        [HttpDelete]
        [Route("DeleteSlotDetails")]
        public IHttpActionResult DeleteSLOT(int id)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            SLOT suppdets = db.SLOTs.Find(id);
            var year = DateTime.Now.Year;

            try
            {
                //  SLOT suppdets = db.SLOTs.Find(id);	
                if (suppdets == null)
                {
                    return NotFound();
                }
                db.SLOTs.Remove(suppdets);
                db.SaveChanges();
                return Ok(suppdets);
            }
            catch (Exception)
            {
                return null;
            }


        }
    }

























    ///////////////////////////////////////////////////////////////////////////////////

}
