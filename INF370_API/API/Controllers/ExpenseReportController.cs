using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.Dynamic;

using System.IO;
using System.Web.Hosting;
using System.Data;
using INF370_API.Models;
using System.Net.Http.Headers;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/ExpenseReport")]
    public class ExpenseReportController : ApiController
    {

        [HttpGet]
        [Route("getData")]

        public dynamic getData()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            DataResult res = new DataResult();
         
            DateTime Month = DateTime.Now.AddDays(-30);
            


            var lists = db.PURCHASEs.Include(zz => zz.PURCHASELINEs).Where(zz => zz.DATE >= Month && zz.DATE <= DateTime.Now).ToList();



            return getExpandoReport(lists);

        }
        INF370Entities db = new INF370Entities();
        public dynamic getExpandoReport(List<PURCHASE> lists)

        {

            try
            {

                List<dynamic> dynamicjobs = new List<dynamic>();
                dynamic total = new ExpandoObject();
                INF370Entities db = new INF370Entities();
                foreach (PURCHASE Jb in lists)
                {
                    var items = db.ITEMs.ToList();
                    var pur = db.PURCHASELINEs.Where(zz => zz.PURCHASEID == Jb.PURCHASEID).FirstOrDefault();
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.Name = items.Where(zz => zz.ITEMID == pur.ITEMID).Select(a => a.NAME);
                    dynamicjob.DESCRIPTION = items.Where(zz => zz.ITEMID == pur.ITEMID).Select(a => a.DESCRIPTION);
                    dynamicjob.PRICE = Jb.PRICE;
                    dynamicjob.DATE = Jb.DATE;
                    dynamicjob.QUANTITY = Jb.QUANTITY;
         

                    dynamicjobs.Add(dynamicjob);
                }
                total.Sum = lists.Sum(vv => vv.PRICE);
                total.Payment = dynamicjobs;
                return total;


            }
            catch (Exception)
            {

                return null;

            }
        }

        [HttpPost]
        [Route("getDatas")]

        public dynamic getDatas(SearchData sd)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            DataResult res = new DataResult();

            var lists = db.PURCHASEs.Include(zz => zz.PURCHASELINEs).Where(zz => zz.DATE >= sd.startdate && zz.DATE <= sd.enddate).ToList();



            return getExpandoReports(lists);

        }
      //  INF370Entities db = new INF370Entities();
        public dynamic getExpandoReports(List<PURCHASE> lists)

        {

            try
            {

                List<dynamic> dynamicjobs = new List<dynamic>();
                dynamic total = new ExpandoObject();
                INF370Entities db = new INF370Entities();
                foreach (PURCHASE Jb in lists)
                {
                    var items = db.ITEMs.ToList();
                    var pur = db.PURCHASELINEs.Where(zz => zz.PURCHASEID == Jb.PURCHASEID).FirstOrDefault();
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.Name = items.Where(zz => zz.ITEMID == pur.ITEMID).Select(a => a.NAME);
                    dynamicjob.DESCRIPTION = items.Where(zz => zz.ITEMID == pur.ITEMID).Select(a => a.DESCRIPTION);
                    dynamicjob.PRICE = Jb.PRICE;
                    dynamicjob.DATE = Jb.DATE;
                    dynamicjob.QUANTITY = Jb.QUANTITY;


                    dynamicjobs.Add(dynamicjob);
                }
                total.Sums = lists.Sum(vv => vv.PRICE);
                total.Payment = dynamicjobs;
                return total;


            }
            catch (Exception)
            {

                return null;

            }
        }

    }
}
