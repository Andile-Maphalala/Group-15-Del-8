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
    [RoutePrefix("api/Requested")]
    public class RequestedJobsController : ApiController
    {
        [HttpGet]
        [Route("GetRequestedJobs/{ID}")]
        public List<dynamic> GetRequestedJobs(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAssignedJobs(db.JOBs.Include(ZZ => ZZ.RENTAL_AGREEMENT).Where(zz => zz.RENTAL_AGREEMENT.CLIENTID == ID).ToList()); //zz.JOBTYPEID == 1 Maintenance guy does both repair and maintain

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

    }
}
