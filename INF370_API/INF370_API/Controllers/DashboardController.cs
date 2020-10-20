using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Globalization;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/Dashboard")]
    public class DashboardController : ApiController
    {

        INF370Entities db = new INF370Entities();

        //public HttpResponseMessage Get()
        //{
        //    List<PROPERTYSTATU> statusList = new List<PROPERTYSTATU>();
        //    using (inf370Entities dc = new inf370Entities())
        //    {
        //        statusList = dc.PROPERTYSTATUS.OrderBy(a => a.PROPERTYSTATUSNAME).ToList();
        //        HttpResponseMessage response;
        //        response = Request.CreateResponse(HttpStatusCode.OK, statusList);
        //        return response;
        //    }
        //}

        [HttpGet]
        [Route("GetIncome")]
        public dynamic GetIncome()
        {
            try
            {
                DateTime date = DateTime.Now;
                var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                double amount = Convert.ToDouble(db.PAYMENTs.Where(zz => zz.PAYMENTDATETIME < date && zz.PAYMENTDATETIME >firstDayOfMonth ).Select(zz => zz.PAYMENT_AMOUNT.Value).Sum());
                return amount;
            }
            catch(Exception e)
            {
                return e;
            }
         
        }


        [HttpGet]
        [Route("GetExpense")]
        public dynamic GetExpense()
        {
            dynamic Expense = new ExpandoObject();
            List<dynamic> objList = new List<dynamic>();
            try
            {
                DateTime date = DateTime.Now;
                var firstDayOfMonth = new DateTime(date.Year, date.Month , 1);
                var firstDayOfMonth1 = new DateTime(date.Year, date.Month-1, 1);
                var firstDayOfMonth2 = new DateTime(date.Year, date.Month-2, 1);
                var firstDayOfMonth3 = new DateTime(date.Year, date.Month-3, 1);


                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                var lastDayOfMonth1 = firstDayOfMonth1.AddMonths(1).AddDays(-1);
                var lastDayOfMonth2 = firstDayOfMonth2.AddMonths(1).AddDays(-1);
                var lastDayOfMonth3 = firstDayOfMonth3.AddMonths(1).AddDays(-1);

                dynamic obj = new ExpandoObject();
                obj.SUM = db.PURCHASEs.Where(zz => zz.DATE > firstDayOfMonth && zz.DATE < lastDayOfMonth).Select(zz => zz.PRICE).Sum();
                if (obj.SUM == null)
                {
                    obj.SUM = 0.00;
                }
                obj.MONTH = firstDayOfMonth.ToString("MMMM", CultureInfo.CreateSpecificCulture("en"));
       

                dynamic obj1 = new ExpandoObject();
                obj1.SUM = db.PURCHASEs.Where(zz => zz.DATE > firstDayOfMonth1 && zz.DATE < lastDayOfMonth1).Select(zz => zz.PRICE).Sum();
                if(obj1.SUM == null)
                {
                    obj1.SUM = 0.00;
                }
                obj1.MONTH = firstDayOfMonth1.ToString("MMMM", CultureInfo.CreateSpecificCulture("en"));
               

                dynamic obj2 = new ExpandoObject();
                obj2.SUM = db.PURCHASEs.Where(zz => zz.DATE > firstDayOfMonth2 && zz.DATE < lastDayOfMonth2).Select(zz => zz.PRICE).Sum();
                if (obj2.SUM == null)
                {
                    obj2.SUM = 0.00;
                }
                obj2.MONTH = firstDayOfMonth2.ToString("MMMM", CultureInfo.CreateSpecificCulture("en"));
              

                dynamic obj3 = new ExpandoObject();
                obj3.SUM = db.PURCHASEs.Where(zz => zz.DATE > firstDayOfMonth3 && zz.DATE < lastDayOfMonth3).Select(zz => zz.PRICE).Sum();
                if (obj3.SUM == null)
                {
                    obj3.SUM = 0.00;
                }
                obj3.MONTH = firstDayOfMonth3.ToString("MMMM", CultureInfo.CreateSpecificCulture("en"));


                objList.Add(obj3);
                objList.Add(obj2);
                objList.Add(obj1);
                objList.Add(obj);

                Expense.List = objList;
                return Expense;

            }
            catch (Exception e)
            {
                return null; ;
            }

        }

        [HttpGet]
        [Route("GetProperty")]
        public dynamic GetProperty()
        {
            dynamic obj = new ExpandoObject();
            try
            {
                obj.Unrented = db.PROPERTies.Where(zz => zz.PROPERTYSTATUSID == 1).Count();
                obj.Rented = db.PROPERTies.Where(zz => zz.PROPERTYSTATUSID == 2).Count();
                obj.Archived = db.PROPERTies.Where(zz => zz.PROPERTYSTATUSID == 3).Count();
                return obj;

            }
            catch (Exception e)
            {
                return e;
            }

        }


        [HttpGet]
        [Route("GetJobs")]
        public dynamic GetJobs()
        {
            dynamic obj = new ExpandoObject();
            try
            {
                DateTime date = DateTime.Now;
                var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

                obj.Unassigned = db.JOBs.Where(zz => zz.JOBSTATUSID == 1 && zz.DATEREQUESTED <= lastDayOfMonth && zz.DATEREQUESTED >= firstDayOfMonth).Count();
                obj.Assigned = db.JOBs.Where(zz => zz.JOBSTATUSID == 2 && zz.DATEREQUESTED <= lastDayOfMonth && zz.DATEREQUESTED >= firstDayOfMonth).Count();
                obj.Completed = db.JOBs.Where(zz => zz.JOBSTATUSID == 3 && zz.DATEREQUESTED <= lastDayOfMonth && zz.DATEREQUESTED >= firstDayOfMonth).Count();
                obj.Total = db.JOBs.Where(zz => zz.DATEREQUESTED <= lastDayOfMonth && zz.DATEREQUESTED >= firstDayOfMonth).Count();

                return obj;
            }
            catch (Exception e)
            {
                return e;
            }

        }

    }
}

