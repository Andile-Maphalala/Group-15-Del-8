using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class UpdateBooking
    {
        public int BookingID { get; set; }
        public int EmployeeDateTimeSlotID { get; set; }

        public int newEmployeeDateTimeSlotID { get; set; }
        public int ClientID { get; set; }

    }
}