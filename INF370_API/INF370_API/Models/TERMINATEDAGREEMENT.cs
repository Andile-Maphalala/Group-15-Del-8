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
    
    public partial class TERMINATEDAGREEMENT
    {
        public int TERMINATEDRENTALAGREEMENTID { get; set; }
        public int RENTALAGREEMENTID { get; set; }
        public Nullable<System.DateTime> DATETIME { get; set; }
        public string REASON { get; set; }
    
        public virtual RENTAL_AGREEMENT RENTAL_AGREEMENT { get; set; }
    }
}