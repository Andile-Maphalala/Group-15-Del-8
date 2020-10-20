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
    [RoutePrefix("api/RequestedApplication")]
    public class ViewApplicationController : ApiController
    {
        [HttpGet]
        [Route("GetRequestedApplication/{ID}")]
        public List<dynamic> GetRequestedApplication(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetRequestedApplication(db.RENTALAPPLICATIONs.Include(ZZ => ZZ.RENTALAPPLICATIONSTATU).Include(ZZ => ZZ.PROPERTY).Where(zz => zz.CLIENTID == ID).ToList()); //zz.JOBTYPEID == 1 Maintenance guy does both repair and maintain

        }
        private List<dynamic> GetRequestedApplication(List<RENTALAPPLICATION> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTALAPPLICATION Jb in forbros)
            {

               var Rent = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALAGREEMENTID == Jb.RENTALAGREEMENTID).FirstOrDefault();

            


                dynamic dynamicjob = new ExpandoObject();
                dynamicjob.RENTALAPPLICATIONID = Jb.RENTALAPPLICATIONID;
                dynamicjob.ADDRESS = Jb.PROPERTY.ADDRESS;
                dynamicjob.RENTALAPPLICATIONSTATUSDESCR = Jb.RENTALAPPLICATIONSTATU.RENTALAPPLICATIONSTATUSDESCR;
                dynamicjob.APPLICATIONDATE = Jb.APPLICATIONDATE;

        
                //dynamicjob.CLIENTNAME = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.NAME);
                //dynamicjob.CLIENTSURNAME = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.SURNAME);
                //dynamicjob.CLIENTNUMBER = db.CLIENTs.Where(hh => hh.CLIENTID == clientID).Select(jj => jj.PHONENUMBER);

                dynamicjobs.Add(dynamicjob);
            }
            return dynamicjobs;
        }


    }
}
