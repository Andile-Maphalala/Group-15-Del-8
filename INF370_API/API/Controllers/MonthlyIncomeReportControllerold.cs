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
    [RoutePrefix("Api/MonthlyIncomeReport")]
    public class MonthlyIncomeReportController : ApiController
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
        public dynamic getExpandoReport(List<PAYMENT>    lists)

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
                //dynamicjob.ApplicationNum = Jb.RENTALAPPLICATIONID;
             
                dynamicjobs.Add(dynamicjob);
            }
            total.Sum = lists.Sum(vv => vv.PAYMENT_AMOUNT);
            total.Payment = dynamicjobs;
            return total;


            }
            catch (Exception)
            {

                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return User;
            }
        }


        // dynamic oObject = new ExpandoObject();
        // var cuslist = lists.GroupBy(gg => gg.PAYMENT_REFERENCE_NO);
        // List<dynamic> cusO = new List<dynamic>();
        // foreach (var cus in cuslist)
        // {
        //     dynamic Payment = new ExpandoObject();


        //     List<dynamic> cusDetail = new List<dynamic>();
        //     foreach (var customerDet in cus)
        //     {
        //         dynamic cusD = new ExpandoObject();
        //         cusD.DueDate = customerDet.PAYMENTDUEDATE.ToString();
        //         cusD.Amount = customerDet.PAYMENT_AMOUNT;
        //         cusD.ReferenceNo = customerDet.PAYMENT_REFERENCE_NO;

        //         cusD.Total = cus.Sum(item => item.PAYMENT_AMOUNT);

        //         cusDetail.Add(cusD);
        //     }


        //     Payment.PAYMENTs = cusDetail;
        //     cusO.Add(Payment);


        // }




        //oObject.PAYMENTs = cusO;



        // return oObject;



    }
}

