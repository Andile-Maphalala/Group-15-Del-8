﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Twilio.Rest;
using System.Data.Entity;
using NF370_API.Models;

namespace INF370_API.Models
{
    public class SendPaymentReminder
    {
        

        private const string MessageTemplate =
             "Inturbidus \n\n Hi {0}. Just a reminder that you have a rental payment due of R {1}.";

        public void Execute()
        {
            var twilioRestClient = new RestClient();


            AvailableAppointments().ForEach(appointment =>
                twilioRestClient.SendSmsMessage(
                "+27"+appointment.CLIENT.PHONENUMBER,
                string.Format(MessageTemplate, appointment.CLIENT.NAME, appointment.AMOUNTDUE)));
        }

        private static List<RENTAL_AGREEMENT> AvailableAppointments()
        {
            INF370Entities db = new INF370Entities();
            List<RENTAL_AGREEMENT> list = db.RENTAL_AGREEMENT.Include(zz => zz.CLIENT).ToList();
            List<RENTAL_AGREEMENT> final = new List<RENTAL_AGREEMENT>();

            foreach (var date in list)
            {
                var end = Convert.ToDateTime(date.DepositDueDate).AddDays(-1);

                if (end == DateTime.Now)
                {


                    final.Add(date);

                }


            }

            return final;

        }
    }
}