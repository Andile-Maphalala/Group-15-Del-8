using NF370_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace INF370_API.Models
{
    public class testReminder
    {
        private const string MessageTemplate =
              "Inturbidus \n\n Hi {0}. This is a test message.";

        public void Execute()
        {
            var twilioRestClient = new RestClient();


            AvailableAppointments().ForEach(appointment =>
                twilioRestClient.SendSmsMessage(
                "+27" + appointment.PHONE_NUMBER,
                string.Format(MessageTemplate, appointment.NAME, appointment.SURNAME)));
        }

        private static List<EMPLOYEE> AvailableAppointments()
        {
            INF370Entities db = new INF370Entities();
            List<EMPLOYEE> list = db.EMPLOYEEs.Where(zz => zz.PHONE_NUMBER =="0726947224").ToList();

            return list;

        }
    }
}