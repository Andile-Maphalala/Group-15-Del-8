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
        [HttpGet]
        [Route("getData/{ID}")]

        public dynamic getData(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            DataResult res = new DataResult();
            var rent = db.RENTAL_AGREEMENT.Where(ss => ss.CLIENTID == ID).FirstOrDefault();
            var today = DateTime.Today;
            var monthback = today.AddMonths(-1);
            var lists = db.PAYMENTs.Include(cc => cc.RENTAL_AGREEMENT).Include(yy => yy.RENTAL_AGREEMENT.PROPERTY).Include(zz => zz.PAYMENTTYPE).Where(zz => zz.RENTAL_AGREEMENT.CLIENTID == ID && zz.PAYMENTDATETIME >= monthback && zz.PAYMENTDATETIME <= today).ToList();



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
                    dynamicjob.Reference = Jb.RENTAL_AGREEMENT.RENTALAGREEMENTID;
                    dynamicjob.Amount = Jb.RENTAL_AGREEMENT.AMOUNTDUE;
                    dynamicjob.Date = Jb.PAYMENTDATETIME;
                    dynamicjob.Address = Jb.RENTAL_AGREEMENT.PROPERTY.ADDRESS;
                    dynamicjob.thismonthpayment = Jb.PAYMENT_AMOUNT;
                    dynamicjob.dateofpay = Jb.PAYMENTDATETIME;

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