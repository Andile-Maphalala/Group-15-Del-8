using INF370_API.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Web;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/GetAvailableSlots")]
    public class MakeBookingController : ApiController
    {
        [HttpGet]
        [Route("Slots")]
        public List<dynamic> GetAvailableSlots()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAvailableSlots(db.EMPLOYEEDATETIMESLOTs.Include(zz => zz.DATETIMESLOT).Include(zz => zz.EMPLOYEE).Where(zz => zz.EMPLOYEESLOTSTAUSID == 1).ToList());

        }
        private List<dynamic> GetAvailableSlots(List<EMPLOYEEDATETIMESLOT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEEDATETIMESLOT Jb in forbros)
            {
                var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                var date = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                var fulldate= Convert.ToDateTime(date + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");

                if (Convert.ToDateTime(fulldate)>=DateTime.Today) {
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
        [Route("BookedSlots")]
        public List<dynamic> BookedSlots()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return BookedSlots(db.EMPLOYEEDATETIMESLOTs.Include(zz => zz.DATETIMESLOT).Include(zz => zz.EMPLOYEE).Where(zz => zz.EMPLOYEESLOTSTAUSID == 2).ToList());

        }
        private List<dynamic> BookedSlots(List<EMPLOYEEDATETIMESLOT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEEDATETIMESLOT Jb in forbros)
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
            return dynamicjobs;
        }






    }

}
//        [HttpPost]
//        [Route("InsertBookingDetails")]
//        public IHttpActionResult PostOwner(BOOKING data)
//        {
//            INF370Entities1 db = new INF370Entities1();
//            db.Configuration.ProxyCreationEnabled = false;

//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }
//            try
//            {
//                var BookingSlot =db.EMPLOYEEDATETIMESLOTs.Where(zz=>zz.EMPLOYEEDATETIMESLOTID== )
//                db.BOOKINGs.Add(data);
//                db.SaveChanges();
//            }

//            catch (Exception)
//            {
//                throw;
//            }



//            return Ok(data);
//        }
//    }
//}
