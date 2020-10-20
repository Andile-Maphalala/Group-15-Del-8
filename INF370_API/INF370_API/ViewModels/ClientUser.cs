using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace INF370_API.ViewModels
{
    public class ClientUser
    {
        public int CLIENTID { get; set; }
        public int USERID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string NAME { get; set; }
        public string SURNAME { get; set; }
        public string PHONENUMBER { get; set; }
        public string EMAIL { get; set; }
        public string PASSPORTNO { get; set; }
        public string NATIONALITY { get; set; }
        public Nullable<System.DateTime> DATE_OF_BIRTH { get; set; }
        public Nullable<bool> ISSTUDENT { get; set; }
        public string RESIDENTIAL_ADDRESS { get; set; }
        public string POSTAL_ADDRESS { get; set; }
        public string NAME_OF_EMPLOYER { get; set; }
        public string OCCUPATION { get; set; }
        public string WORK_ADDRESS { get; set; }
        public string WORK_TEL_NO { get; set; }
        public Nullable<double> GROSS_SALARY { get; set; }
    }
}