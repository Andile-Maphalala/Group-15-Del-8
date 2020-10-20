using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class CustomLog

    {

        public Guid Id { get; set; }

        public string Action { get; set; }

        public string TableName { get; set; }

        public string PrimaryKey { get; set; }

        public string ColumnName { get; set; }

        public string OldValue { get; set; }

        public string NewValue { get; set; }

        public DateTime Date { get; set; }

        public int UserId { get; set; }

    }
}