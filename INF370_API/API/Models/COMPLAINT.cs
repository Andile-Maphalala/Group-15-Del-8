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
    
    public partial class COMPLAINT
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public COMPLAINT()
        {
            this.FEEDBACKs = new HashSet<FEEDBACK>();
        }
    
        public int COMPLAINTID { get; set; }
        public Nullable<int> EMPLOYEEID { get; set; }
        public int COMPLAINTSTATUSID { get; set; }
        public int RENTALAGREEMENTID { get; set; }
        public Nullable<int> FEEDBACKID { get; set; }
        public Nullable<System.DateTime> DATE { get; set; }
        public string DETAILS { get; set; }
        public string PHOTO { get; set; }
    
        public virtual EMPLOYEE EMPLOYEE { get; set; }
        public virtual COMPLAINTSTATU COMPLAINTSTATU { get; set; }
        public virtual FEEDBACK FEEDBACK { get; set; }
        public virtual RENTAL_AGREEMENT RENTAL_AGREEMENT { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FEEDBACK> FEEDBACKs { get; set; }
    }
}