using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using INF370_API.Models;
using System.Data.Entity;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("api/MakePayment")]
    public class MakePaymentController : ApiController
    {
        [Route("getMD5Hash")]
        [HttpPost]
        public string getMD5Hash(dynamic stringX)
        {
            string newStr = stringX.hashString;
            newStr = newStr.Replace('$', '&');
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(newStr);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString().ToLower();
            }

        }
        [HttpGet]
        [Route("GetProperties/{ClientID}")]
        public List<dynamic> GetProperties(string ClientID)
        {
            var clientid = Convert.ToInt32(ClientID);
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetProperties(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.CLIENTID == clientid &&zz.RENTALSTATUSID==1||zz.RENTALSTATUSID==5).ToList());

        }
        private List<dynamic> GetProperties(List<RENTAL_AGREEMENT> forbros)
        {
            List<dynamic> dynamicjobs = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (RENTAL_AGREEMENT Jb in forbros)
            {

                dynamic dynamicjob = new ExpandoObject();

                var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
                dynamicjob.ReferenceNo = Jb.REFERENCE_NO;
                dynamicjob.AmountDue = Jb.AMOUNTDUE;
                dynamicjob.status = Jb.RENTALSTATUSID;
                dynamicjobs.Add(dynamicjob);

                //List<dynamic> RentalDetails = new List<dynamic>();
                //foreach (var Details in Jb)
                //{
                //    dynamic dynamiDetails = new ExpandoObject();
                //    dynamiDetails.AmountDue = Jb.AMOUNTDUE;
                //}
            }
            return dynamicjobs;
        }

        //  [HttpPost]
        //  [Route("AddPayment")]
        //  public dynamic GetAmount(PAYMENT Pay)
        //{

        //      INF370Entities db = new INF370Entities();
        //      db.Configuration.ProxyCreationEnabled = false;

        //      try
        //      {
        //          PAYMENT pay = new PAYMENT();
        //          pay.PAYMENTDATETIME = DateTime.Today;
        //          string referance = Pay.PAYMENT_REFERENCE_NO.ToString();
        //          pay.RENTALAGREEMENTID = Convert.ToInt32(db.RENTAL_AGREEMENT.Where(jj => jj.REFERENCE_NO == referance).Select(ll => ll.RENTALAGREEMENTID).FirstOrDefault());
        //          pay.PAYMENTTYPEID = Pay.PAYMENTTYPEID;
        //          pay.PAYMENT_AMOUNT = Pay.PAYMENT_AMOUNT;
        //          pay.PAYMENT_REFERENCE_NO = Pay.PAYMENT_REFERENCE_NO;

        //          db.PAYMENTs.Add(pay);
        //          db.SaveChanges();

        //          RENTAL_AGREEMENT rent = db.RENTAL_AGREEMENT.Where(LL => LL.RENTALAGREEMENTID == pay.RENTALAGREEMENTID).FirstOrDefault();
        //          if (rent.RENTALSTATUSID == 1) 
        //          {
        //          rent.RENTALSTATUSID = 5;
        //              rent.AMOUNTDUE = rent.AMOUNTDUE - Convert.ToInt16(Pay.PAYMENT_AMOUNT);
        //              db.SaveChanges();
        //          }
        //       else
        //          {
        //              rent.AMOUNTDUE = rent.AMOUNTDUE -Convert.ToInt32( Pay.PAYMENT_AMOUNT);
        //              db.SaveChanges();

        //          }







        //      }
        //      catch (Exception )
        //      {

        //          return null;
        //      }


        //      return Ok();

        //  }




        [HttpPost]
        [Route("AddPayment/{ID}")]
        public dynamic GetAmount(int ID)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                string myref = ID.ToString();
                RENTAL_AGREEMENT rent = db.RENTAL_AGREEMENT.Where(zz => zz.REFERENCE_NO == myref).FirstOrDefault();

                PAYMENT pay = new PAYMENT();
                pay.PAYMENTDATETIME = DateTime.Today;
                pay.RENTALAGREEMENTID = rent.RENTALAGREEMENTID;
                string referance = rent.REFERENCE_NO;
                if(rent.RENTALSTATUSID == 1)
                {
                    pay.PAYMENTTYPEID = 1;
                    pay.PAYMENT_AMOUNT = rent.AMOUNTDUE;
                    pay.PAYMENT_REFERENCE_NO = ID;

                    //myrent.RENTALSTATUSID = 5;
                    //myrent.AMOUNTDUE = rent.AMOUNTDUE - rent.AMOUNTDUE;
                    //db.SaveChanges();
                }
                else if (rent.RENTALSTATUSID == 5)
                {
                    pay.PAYMENTTYPEID = 2;
                    pay.PAYMENT_AMOUNT = rent.AMOUNTDUE;
                    pay.PAYMENT_REFERENCE_NO = ID;


                    //myrent.AMOUNTDUE = rent.AMOUNTDUE - rent.AMOUNTDUE;
                    //db.SaveChanges();
                }



                db.PAYMENTs.Add(pay);
                db.SaveChanges();

                RENTAL_AGREEMENT myrent = db.RENTAL_AGREEMENT.Find(rent.RENTALAGREEMENTID);
                if (rent.RENTALSTATUSID == 1)
                {
                    rent.RENTALSTATUSID = 5;
                    //rent.AMOUNTDUE = 0;
                    db.SaveChanges();
                }
                else
                {
                    rent.AMOUNTDUE = 0;
                    db.SaveChanges();

                }


            }
            catch (Exception e)
            {

                return null;
            }


            return Ok();

        }



        [HttpGet]
        [Route("GetAmountDue/{ReferenceNo}")]
        public dynamic GetAmount(string ReferenceNo)
        {

            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetAmount(db.RENTAL_AGREEMENT.Include(zz => zz.PROPERTY).Include(zz => zz.CLIENT).Where(zz => zz.REFERENCE_NO == ReferenceNo).FirstOrDefault());

        }
        private dynamic GetAmount(RENTAL_AGREEMENT forbros)
        {
            dynamic dynamicjob = new ExpandoObject();
            dynamicjob.AMOUNTDUE = forbros.AMOUNTDUE;
            dynamicjob.RENTALSTATUSID = forbros.RENTALSTATUSID;
            dynamicjob.DepositDueDate = forbros.DepositDueDate;

            //List<dynamic> dynamicjobs = new List<dynamic>();
            //INF370Entities1 db = new INF370Entities1();
            //foreach (RENTAL_AGREEMENT Jb in forbros)
            //{

            //    dynamic dynamicjob = new ExpandoObject();
            //    var Property = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
            //    dynamicjob.PropertyAddress = db.PROPERTies.Where(zz => zz.PROPERTYID == Jb.PROPERTYID).Select(zz => zz.ADDRESS);
            //    dynamicjob.ReferenceNo = Jb.REFERENCE_NO;
            //    dynamicjob.AmountDue = Jb.AMOUNTDUE;

            //    //List<dynamic> RentalDetails = new List<dynamic>();
            //    //foreach (var Details in Jb)
            //    //{
            //    //    dynamic dynamiDetails = new ExpandoObject();
            //    //    dynamiDetails.AmountDue = Jb.AMOUNTDUE;
            //    //}
            //}
            return dynamicjob;
        }


        [HttpPost]
        [Route("ViewPayments/{ID}")]
        public dynamic ViewPayments(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                //CLIENT client = db.CLIENTs.Where(zz => zz.CLIENTID == ID).FirstOrDefault();
                List<RENTAL_AGREEMENT> rentalList = db.RENTAL_AGREEMENT.Where(zz => zz.CLIENTID == ID).ToList();
                List<dynamic> PaymentList = new List<dynamic>();

                foreach (var x in rentalList)
                {
                    List<PAYMENT> paylist = db.PAYMENTs.Where(zz => zz.RENTALAGREEMENTID == x.RENTALAGREEMENTID).ToList();
                    foreach (var y in paylist)
                    {
                        dynamic rent = new ExpandoObject();

                        rent.PAYMENTID = y.PAYMENTID;
                        rent.RENTALAGREEMENTID = y.RENTALAGREEMENTID;
                        rent.PAYMENT_REFERENCE_NO = y.PAYMENT_REFERENCE_NO;
                        rent.PAYMENT_AMOUNT = y.PAYMENT_AMOUNT;
                        rent.PAYMENTDATETIME = y.PAYMENTDATETIME;
                        rent.PAYMENTTYPE = db.PAYMENTTYPEs.Where(zz => zz.PAYMENTTYPEID == y.PAYMENTTYPEID).Select(yy => yy.PAYMENTTYPE_NAME).FirstOrDefault();

                        PaymentList.Add(rent);
                    }


                }
                return PaymentList;
            }
            catch (Exception e)
            {
                return e;
            }


        }


    }
}

