using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
   
        public class DataResult
        {
            public List<IGrouping<string, ReportRecord>> results { get; set; }
            public Dictionary<string, double?> chartData { get; set; }

        }

        public class ReportRecord
        {
            

            public string Date { get; set; }
            public double? Amount { get; set; }
            

        }
    }