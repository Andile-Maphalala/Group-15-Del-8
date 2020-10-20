using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.Models
{
    public class EmployeeUser
    {
    public  int EMPLOYEEID { get; set; }
        public int USERID { get; set; }
        public int EMPLOYEETYPEID { get; set; }
        public string EMPLOYEENATIONALID { get; set; }
        public int EMPLOYEEPASSPORTNO { get; set; }
        public DateTime DATEEMPLOYED { get; set; }
        public bool ACTIVE { get; set; }
        public string NAME { get; set; }
        public string SURNAME { get; set; }
        public string DATEOFBIRTH { get; set; }
        public string PHONE_NUMBER { get; set; }
        public string EMAIL { get; set; }

        public int USERTYPEID { get; set; }
        public string USERNAME { get; set; }
        public string PASSWORD { get; set; }
        public string RESETOTP { get; set; }
        public bool UserPasswordChangeRequest { get; set; }
    }
}