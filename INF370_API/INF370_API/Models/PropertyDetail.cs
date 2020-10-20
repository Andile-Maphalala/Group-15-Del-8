using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class PropertyDetail
    {
        public string PROPERTYID { get; set; }
        public string PROPERTYSTATUSID { get; set; }
        public string PROPERTYTYPEID { get; set; }
        public string AGENT_ID { get; set; }
        public string AREAID { get; set; }
        public string PROPERTYDESCRIPTION { get; set; }
        public string ADDRESS { get; set; }
        public string SIZE { get; set; }
        public string NUMBED { get; set; }
        public string NUMBBATH { get; set; }
        public int? AMOUNT { get; set; }
        public string GARDEN { get; set; }
        public string ADDITIONALINFO { get; set; }
        public string LISTINGDATE { get; set; }
  
    }
}