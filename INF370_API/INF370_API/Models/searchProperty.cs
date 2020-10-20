using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class searchProperty
    {

        public int minamount { get; set; }
        public int maxamount { get; set; }
        public int minbed { get; set; }

        
        public string type { get; set; }

        public string searchValue { get; set; }
    }
}