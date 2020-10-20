using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using NF370_API.Models;

namespace INF370_API.Models
{
    public class SendLeaseReminder
    {
        private const string MessageTemplate =
        "Inturbidus \n\n Hi {0}. Just a reminder that your rental agreement {1} will expire in 2 months on {3}.Please send a rental extension request to extend your rental agreement.";

        public void Execute()
        {
            var twilioRestClient = new RestClient();


            AvailableAppointments().ForEach(appointment =>
                twilioRestClient.SendSmsMessage(
                "+27" + appointment.CLIENT.PHONENUMBER,
                string.Format(MessageTemplate, appointment.CLIENT.NAME, appointment.REFERENCE_NO,appointment.RENTALENDDATE)));
        }

        private static List<RENTAL_AGREEMENT> AvailableAppointments()
        {
            INF370Entities db = new INF370Entities();
            List<RENTAL_AGREEMENT> list = db.RENTAL_AGREEMENT.Include(zz => zz.CLIENT).ToList();
            List<RENTAL_AGREEMENT> final = new List<RENTAL_AGREEMENT>();
      
            foreach (var date in list)
            {
                var end = Convert.ToDateTime(date.RENTALENDDATE).AddMonths(-2);

                if (end <= DateTime.Now)
                {
                   

                    final.Add(date);

                }


            }

            return final;

        }
    }
}