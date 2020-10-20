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
//using CrystalDecisions.CrystalReports.Engine;
using System.Web.Hosting;

using System.Data;
using System.Net.Http.Headers;
namespace INF370_API.Controllers
{
    [RoutePrefix("api/ClientPayment")]
    public class ClientPaymentController : ApiController
    {
        [HttpPost]
        [Route("getData")]

        public dynamic getData(SearchData sd)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            DataResult res = new DataResult();

            var lists = db.PAYMENTs.Include(n => n.RENTAL_AGREEMENT).Include(i => i.RENTAL_AGREEMENT.CLIENT).Include(a => a.RENTAL_AGREEMENT.PROPERTY).Where(zz => zz.PAYMENTDATETIME >= sd.startdate && zz.PAYMENTDATETIME <= sd.enddate).
          ToList()
           

            ;

          


            return getExpandoReport(lists);







        }




        public dynamic getExpandoReport(List<PAYMENT> lists)
        {
            dynamic oObject = new ExpandoObject();
            INF370Entities db = new INF370Entities();

            var clnlist = lists.GroupBy(gg => gg.RENTAL_AGREEMENT.PROPERTY.ADDRESS );
            List<dynamic> clns = new List<dynamic>();
            foreach (var clnGroup in clnlist)
            {
                dynamic cln = new ExpandoObject();
                cln.Name = clnGroup.Key;

                cln.Total = clnGroup.Sum(g => g.PAYMENT_AMOUNT);
                clns.Add(cln);

            }

            oObject.Properties = clns;

            //////
            var clntlist = lists.GroupBy(gg => gg.RENTAL_AGREEMENT.CLIENT.NAME +" "+ gg.RENTAL_AGREEMENT.CLIENT.SURNAME);
            List<dynamic> cusO = new List<dynamic>();
            foreach (var cus in clntlist)
            {
                dynamic client = new ExpandoObject();
                client.Name = cus.Key;
                //client.Surname ="";

                List<dynamic> cusDetail = new List<dynamic>();
                foreach (var customerDet in cus)
                {
                    dynamic cusD = new ExpandoObject();

                    cusD.NAME = customerDet.RENTAL_AGREEMENT.CLIENT.NAME;
                    cusD.SURNAME = customerDet.RENTAL_AGREEMENT.CLIENT.SURNAME;
                    cusD.PAYMENTDATETIME = customerDet.PAYMENTDATETIME;
                    cusD.PAYMENTID = customerDet.PAYMENTID;
                    cusD.ADDRESS = customerDet.RENTAL_AGREEMENT.PROPERTY.ADDRESS;
                    cusD.PAYMENT_AMOUNT = customerDet.PAYMENT_AMOUNT;
                    cusD.ADDRESS = customerDet.RENTAL_AGREEMENT.PROPERTY.ADDRESS;
                    cusD.Total = cus.Sum(item => item.PAYMENT_AMOUNT);

                    cusDetail.Add(cusD);
                }
                client.Total = cus.Sum(item => item.PAYMENT_AMOUNT);
                //cus.Sum(item => item.Order_Details.Sum(rr => rr.Quantity * rr.UnitPrice));
                client.payments = cusDetail;
                cusO.Add(client);


            }

    

            oObject.Clients = cusO;



            return oObject;
        }

        //private HttpResponseMessage getCustomerReportFile(List<PAYMENT> lists)
        //{
        //    ReportDocument reprt = new ReportDocument();
        //    reprt.Load(Path.Combine(HostingEnvironment.MapPath("~/Reports/ClientPayment.rpt")));
        //    ClientPayment ClientPayment = new ClientPayment();

        //    foreach (PAYMENT order in lists)
        //    {
        //        DataRow row = ClientPayment.PAYMENTs.NewRow();
        //        row["PAYMENTID"] = order.PAYMENTID;
        //        row["NAME"] = order.RENTAL_AGREEMENT.CLIENT.NAME;
        //        row["SURNAME"] =order.RENTAL_AGREEMENT.CLIENT.SURNAME;
        //        row["PAYMENTDATETIME"] = order.PAYMENTDATETIME;
        //        row["ADDRESS"] = order.RENTAL_AGREEMENT.PROPERTY.ADDRESS;

              
        //    }
        //    reprt.SetDataSource(ClientPayment);

        //    HttpResponseMessage HttpResponseMessage = new HttpResponseMessage();
        //    Stream strm = reprt.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    strm.Seek(0, SeekOrigin.Begin);
        //    HttpResponseMessage.Content = new StreamContent(strm);
        //    HttpResponseMessage.Content.Headers.Add("x.filename", "report.pdf");
        //    HttpResponseMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
        //    HttpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //    HttpResponseMessage.Content.Headers.ContentDisposition.FileName = "ClientPayment.pdf";
        //    HttpResponseMessage.StatusCode = HttpStatusCode.OK;
        //    return HttpResponseMessage;


























        //}






    }
}
