using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.Dynamic;
using INF370_API.Models;

using INF370_API.Controllers;
using System.IO;

using System.Web.Hosting;

using System.Data;
using System.Net.Http.Headers;
using System.Data.Entity.Infrastructure;

namespace INF370_API.Controllers
{
    public class AutoTimerController : ApiController
    {
        INF370Entities db = new INF370Entities();
        [Route("api/LogoutTime/ChangeLogoutTime")]
        [HttpPut]
        public IHttpActionResult PutLogoutTime(Time time)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            time.TimeID = 1;
            db.Entry(time).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.BadRequest);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("api/LogoutTime/GetLogoutTime")]
        [HttpGet]
        public dynamic GetLougOutTime()
        {
            dynamic toReturn = new ExpandoObject();

            Time tim = db.Times.Where(zz => zz.TimeID == 1).FirstOrDefault();
            toReturn.Time = tim.Logouttime;

            return toReturn;
        }

        [HttpGet]
        [Route("api/LogoutTime/GetLogoutTimes")]
        public List<dynamic> GetDatetimeslot()
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetDatetimeslots(db.Times.Where(zz => zz.TimeID == 1).ToList()); //change back 

        }
        private List<dynamic> GetDatetimeslots(List<Time> forbros)
        {
            List<dynamic> dynamicslots = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (Time st in forbros)
            {
                

                dynamic dynamicslot = new ExpandoObject();
                dynamicslot.TimeID = st.TimeID;
                dynamicslot.Logouttime = st.Logouttime;
          



                dynamicslots.Add(dynamicslot);
            }
            return dynamicslots;
        }

    }
}
