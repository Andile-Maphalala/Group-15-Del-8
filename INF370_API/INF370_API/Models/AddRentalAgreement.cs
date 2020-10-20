using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class AddRentalAgreement
    {
        public int ClientID { get; set; }
        public int PropertyID { get; set; }
        public int RentalApplicationID { get; set; }
    }
}