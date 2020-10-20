using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class Email
    {
        // public int ClientID { get; set; }
        public int RentalAgreementID { get; set; }
        public DateTime TerminationDate { get; set; }
        public DateTime ExtensionDate { get; set; }
        public string TerminationReason { get; set; }
        public string MaintenanceReason { get; set; }
        public int ExtensionPeriod { get; set; }
        // public int TerminationReason { get; set; }
    }
}
