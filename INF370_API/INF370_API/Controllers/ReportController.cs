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

namespace INF370_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        INF370Entities db = new INF370Entities();

        [Route("MostRentedReport")]
        [HttpPost]
        public dynamic MostRentedReport(SearchData sd)
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> propList = new List<dynamic>();

            dynamic Report = new ExpandoObject();
            try
            {
                List<RENTAL_AGREEMENT> rentalList = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTARTDATE >= sd.startdate && zz.RENTALSTARTDATE <= sd.enddate).Include(zz => zz.PROPERTY).ToList();


                foreach (var x in db.PROPERTYTYPEs.ToList())
                {
                    dynamic myprop = new ExpandoObject();

                    myprop.Count = db.RENTAL_AGREEMENT.Where(zz => zz.RENTALSTARTDATE >= sd.startdate && zz.RENTALSTARTDATE <= sd.enddate).Include(zz => zz.PROPERTY).Where(zz => zz.PROPERTY.PROPERTYID == x.PROPERTYTYPEID).Count();
                    myprop.Name = x.PROPERTTYPEDESCRIPTION;
                    propList.Add(myprop);
                }

                //foreach (var x in propList)
                //{
                //    dynamic myprop = new ExpandoObject();

                //    myprop.Visited = x.TIMESVISITED;
                //    myprop.Name = x.PROPERTTYPEDESCRIPTION;

                //    propList.Add(myprop);
                //}
            }
            catch
            {
                return null;
            }

            Report.List = propList;

            return Report;

        }

        [Route("OverduePayment")]
        [HttpGet]
        public dynamic OverduePayment()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> UserList = new List<dynamic>();
            double total = 0;
            dynamic Report = new ExpandoObject();
            try
            {

                List<RENTAL_AGREEMENT> overdue = db.RENTAL_AGREEMENT.Include(zz => zz.CLIENT).Where(zz => zz.AMOUNTDUE > 0).ToList();
                foreach (var x in overdue)
                {
                    dynamic myclinet = new ExpandoObject();
                    myclinet.Name = x.CLIENT.NAME;
                    myclinet.Surname =x.CLIENT.SURNAME;
                    myclinet.AmountDue = x.AMOUNTDUE;
                    myclinet.Email = x.CLIENT.EMAIL;
                    myclinet.PhomeNumber = x.CLIENT.PHONENUMBER;
                    myclinet.ReferanceNo = x.REFERENCE_NO;
                    total += Convert.ToDouble(x.AMOUNTDUE);

                    UserList.Add(myclinet);
                }
            }
            catch(Exception )
            {
                return false;
            }

            Report.Total = total;
            Report.List = UserList;

            return Report;

        }
    }
}
