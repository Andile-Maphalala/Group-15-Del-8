//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace INF370_API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Audit
    {
        public long Id { get; set; }
        public string TableName { get; set; }
        public string Updated_By { get; set; }
        public string Actions { get; set; }
        public string OldData { get; set; }
        public string NewData { get; set; }
        public string Created_For { get; set; }
        public Nullable<System.DateTime> Updated_Date { get; set; }
    }
}
