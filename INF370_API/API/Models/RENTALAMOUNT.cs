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
    
    public partial class RENTALAMOUNT
    {
        public Nullable<int> PROPERTYID { get; set; }
        public Nullable<System.DateTime> DATE { get; set; }
        public Nullable<int> AMOUNT { get; set; }
        public int RENTALAMOUNTID { get; set; }
    
        public virtual PROPERTY PROPERTY { get; set; }
    }
}