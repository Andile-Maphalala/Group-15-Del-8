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
    
    public partial class COMPLAINTSTATU
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public COMPLAINTSTATU()
        {
            this.COMPLAINTs = new HashSet<COMPLAINT>();
        }
    
        public int COMPLAINTSTATUSID { get; set; }
        public string COMPLAINTSTATUS_NAME { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMPLAINT> COMPLAINTs { get; set; }
    }
}
