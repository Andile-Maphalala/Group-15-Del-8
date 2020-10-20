using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/MonthlyInvoiceReport")]
    public class MonthlyInvoiceReportController : ApiController
    {
        [HttpPost]
        [Route("getData")]

        public dynamic getData(SearchData sd)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            DataResult res = new DataResult();

            var lists = db.PAYMENTs.Include(zz => zz.PAYMENTTYPE).Where(zz => zz.PAYMENTDATETIME >= sd.startdate && zz.PAYMENTDATETIME <= sd.enddate).ToList();



            return getExpandoReport(lists);

        }
        INF370Entities db = new INF370Entities();
        public dynamic getExpandoReport(List<PAYMENT> lists)

        {

            try
            {

                List<dynamic> dynamicjobs = new List<dynamic>();
                dynamic total = new ExpandoObject();
                INF370Entities db = new INF370Entities();
                foreach (PAYMENT Jb in lists)
                {
                    dynamic dynamicjob = new ExpandoObject();
                    dynamicjob.Reference = Jb.PAYMENT_REFERENCE_NO;
                    dynamicjob.Amount = Jb.PAYMENT_AMOUNT;
                    dynamicjob.Date = Jb.PAYMENTDATETIME;
                    dynamicjob.PaymentType = Jb.PAYMENTTYPE.PAYMENTTYPE_NAME;
                    
                    //dynamicjob.ApplicationNum = Jb.RENTALAPPLICATIONID;

                    dynamicjobs.Add(dynamicjob);
                }
                
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
