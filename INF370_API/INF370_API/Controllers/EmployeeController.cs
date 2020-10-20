using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Text;
using System.Security.Cryptography;
using System.Data.Entity;
using System.Net.Mail;


namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Employee")]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeeController : ApiController
    {
        
        INF370Entities db = new INF370Entities();

        [HttpGet]
        [Route("GetEmployeeTypes")]
        public IQueryable<EMPLOYEETYPE> GetEmployeeTypes()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.EMPLOYEETYPEs;
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("GetEmployeeTypeDetailsById/{EmployeeTypeID}")]
        public IHttpActionResult GetEmployeeTypeById(string EmployeeTypeID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            EMPLOYEETYPE objEmp = new EMPLOYEETYPE();
            try
            {
                int ID = Convert.ToInt32(EmployeeTypeID);

                objEmp = db.EMPLOYEETYPEs.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertEmployeeTypeDetails")]
        public IHttpActionResult PostOwner(EMPLOYEETYPE data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.EMPLOYEETYPEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateEmployeeTypeDetails")]
        public IHttpActionResult PutOwnerMaster(EMPLOYEETYPE EmployeeType)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                EMPLOYEETYPE objEmp = new EMPLOYEETYPE();
                objEmp = db.EMPLOYEETYPEs.Find(EmployeeType.EMPLOYEETYPEID);
                if (objEmp != null)
                {
                    objEmp.EMPLOYEETYPEDESCRIPTION = EmployeeType.EMPLOYEETYPEDESCRIPTION;
                 


                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(EmployeeType);
        }


        [HttpDelete]
        [Route("DeleteEmployeeTypeDetails")]
        public IHttpActionResult DeleteOwner(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                EMPLOYEETYPE employeeTypeDetails = db.EMPLOYEETYPEs.Find(id);
                if (employeeTypeDetails == null)
                {
                    return NotFound();
                }

                db.EMPLOYEETYPEs.Remove(employeeTypeDetails);
                db.SaveChanges();

                return Ok(employeeTypeDetails);

            }
            catch (Exception)
            {

                return null;
            }

      
        }


        [Route("GetAllEmployees")]
        public List<dynamic> getemployee()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return getemployee(db.EMPLOYEEs.Include(v => v.USER).Include(p => p.USER.USERTYPE).Include(l => l.EMPLOYEETYPE).Where(zz => zz.EMPLOYEETYPEID != 1).ToList());
        }
        private List<dynamic> getemployee(List<EMPLOYEE> forbros)
        {
            List<dynamic> dynamicagreements = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEE ra in forbros)
            {

                dynamic dynamicagreement = new ExpandoObject();
                dynamicagreement.EMPLOYEEID = ra.EMPLOYEEID;
                dynamicagreement.USERID = ra.USERID;
                dynamicagreement.EMPLOYEETYPEID = ra.EMPLOYEETYPEID;
                dynamicagreement.EMPLOYEENATIONALID = ra.EMPLOYEENATIONALID;
                dynamicagreement.EMPLOYEEPASSPORTNO = ra.EMPLOYEEPASSPORTNO;
                dynamicagreement.DATEEMPLOYED = ra.DATEEMPLOYED;
                dynamicagreement.ACTIVE = ra.ACTIVE;
                dynamicagreement.NAME = ra.NAME;
                dynamicagreement.SURNAME = ra.SURNAME;
                dynamicagreement.DATEOFBIRTH = ra.DATEOFBIRTH;
                dynamicagreement.PHONE_NUMBER = ra.PHONE_NUMBER;
                dynamicagreement.EMAIL = ra.EMAIL;
                dynamicagreement.USERNAME = ra.USER.USERNAME;
                dynamicagreement.USERTYPEDESCRIPTION = ra.USER.USERTYPE.USERTYPEDESCRIPTION;
                dynamicagreement.EMPLOYEETYPEDESCRIPTION = ra.EMPLOYEETYPE.EMPLOYEETYPEDESCRIPTION;
                dynamicagreements.Add(dynamicagreement);
            }
            return dynamicagreements;
        }

        [HttpGet]
        [Route("GetEmployeeDetailsById/{EMPLOYEEID}")]
        public IHttpActionResult GetEmployeeById(string EMPLOYEEID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            EMPLOYEE objEmp = new EMPLOYEE();
            try
            {
                int ID = Convert.ToInt32(EMPLOYEEID);

                objEmp = db.EMPLOYEEs.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(objEmp);
        }


        [HttpGet]
        [Route("GetEmployeeType")]
        public List<dynamic> GetEmployeeType()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetEmployeeType(db.EMPLOYEETYPEs.Where(m => m.EMPLOYEETYPEID != 1).ToList()); //change back 	
        }
        private List<dynamic> GetEmployeeType(List<EMPLOYEETYPE> forbros)
        {
            List<dynamic> dynamicslots = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (EMPLOYEETYPE st in forbros)
            {
                dynamic dynamicslot = new ExpandoObject();
                dynamicslot.EMPLOYEETYPEID = st.EMPLOYEETYPEID;
                dynamicslot.EMPLOYEETYPEDESCRIPTION = st.EMPLOYEETYPEDESCRIPTION;
                dynamicslots.Add(dynamicslot);
            }
            return dynamicslots;
        }
        [HttpGet]
        [Route("GetUserType")]
        public List<dynamic> GetUserType()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            return GetUserType(db.USERTYPEs.Where(A => A.USERTYPEID != 2 && A.USERTYPEID != 3).ToList()); //change back 	
        }
        private List<dynamic> GetUserType(List<USERTYPE> forbros)
        {
            List<dynamic> dynamicslots = new List<dynamic>();
            INF370Entities db = new INF370Entities();
            foreach (USERTYPE st in forbros)
            {
                dynamic dynamicslot = new ExpandoObject();
                dynamicslot.USERTYPEID = st.USERTYPEID;
                dynamicslot.USERTYPEDESCRIPTION = st.USERTYPEDESCRIPTION;
                dynamicslots.Add(dynamicslot);
            }
            return dynamicslots;
        }
        [HttpPost]
        [Route("InsertEmployeeDetails")]
        public IHttpActionResult Postitme(EmployeeUser data)
        {

            try
            {
                USER user = new USER();
                user.USERNAME = data.USERNAME;
                string passString = data.PASSWORD;
                var hash = GenerateHash(ApplySomeSalt(passString));
                user.PASSWORD = hash;

                user.USERTYPEID = data.USERTYPEID;
                user.UserPasswordChangeRequest = false;
                db.USERs.Add(user);
                db.SaveChanges();
                int value = int.Parse(db.USERs
                  .OrderByDescending(p => p.USERID)
                  .Select(r => r.USERID)
                  .First().ToString());
                EMPLOYEE EMPLOYEE = new EMPLOYEE();
                EMPLOYEE.USERID = value;
                EMPLOYEE.EMPLOYEETYPEID = data.EMPLOYEETYPEID;
                EMPLOYEE.EMPLOYEENATIONALID = data.EMPLOYEENATIONALID;
                EMPLOYEE.EMPLOYEEPASSPORTNO = data.EMPLOYEEPASSPORTNO;
                EMPLOYEE.DATEEMPLOYED = DateTime.Today;
                EMPLOYEE.ACTIVE = true;
                EMPLOYEE.NAME = data.NAME;
                EMPLOYEE.SURNAME = data.SURNAME;
                EMPLOYEE.DATEOFBIRTH = data.DATEOFBIRTH;
                EMPLOYEE.PHONE_NUMBER = data.PHONE_NUMBER;
                EMPLOYEE.EMAIL = data.EMAIL;
                db.EMPLOYEEs.Add(EMPLOYEE);
                db.SaveChanges();
                try
                {

                    //send email with verification OTP	
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(data.EMAIL);
                    mail.Subject = "Employee Details Added";
                    mail.Body = "Good day " + data.NAME + " " + data.SURNAME + "\n  Your details have been added to the system \n Your Username is: " + data.USERNAME;
                    SmtpServer.Port = 587;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Send(mail);
                }
                catch (Exception)
                {
                    return null;
                }
            }
            catch (Exception)
            {
                dynamic User = new ExpandoObject();
                User.Message = "Something went wrong !";
                return null;
            }
            return Ok(data);
        }
        [HttpPut]
        [Route("UpdateEmployeeDetails")]
        public IHttpActionResult PutOwnerMaster(EMPLOYEE Employee)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                EMPLOYEE objEmp = new EMPLOYEE();
                objEmp = db.EMPLOYEEs.Find(Employee.EMPLOYEEID);
                if (objEmp != null)
                {
                    objEmp.USERID = Employee.USERID;
                    objEmp.EMPLOYEETYPEID = Employee.EMPLOYEETYPEID;
                    objEmp.NAME = Employee.NAME;
                    objEmp.SURNAME = Employee.SURNAME;
                    objEmp.EMPLOYEENATIONALID = Employee.EMPLOYEENATIONALID;
                    objEmp.EMPLOYEEPASSPORTNO = Employee.EMPLOYEEPASSPORTNO;
                    objEmp.DATEEMPLOYED = Employee.DATEEMPLOYED;
                    objEmp.DATEOFBIRTH = Employee.DATEOFBIRTH;
                }
                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return Ok(Employee);
        }
        [HttpPut]
        [Route("DeleteEmployeeDetails")]
        public IHttpActionResult DeleteEmp(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Employee = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == id).FirstOrDefault();
            var Job = db.JOBs.Where(e => e.EMPLOYEEID == id && e.JOBSTATUSID == 2).ToList();
            try
            {
                EMPLOYEE objEmp = new EMPLOYEE();
                objEmp = db.EMPLOYEEs.Find(Employee.EMPLOYEEID);
                if (objEmp != null && Job.Count < 1)
                {
                    objEmp.ACTIVE = false;


                }
                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return Ok(Employee);
        }
        [HttpPut]
        [Route("ReEmployeeDetails")]
        public IHttpActionResult ReEmp(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Employee = db.EMPLOYEEs.Where(zz => zz.EMPLOYEEID == id).FirstOrDefault();
            try
            {
                EMPLOYEE objEmp = new EMPLOYEE();
                objEmp = db.EMPLOYEEs.Find(Employee.EMPLOYEEID);
                if (objEmp != null)
                {
                    objEmp.ACTIVE = true;
                }
                int i = this.db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }
            return Ok(Employee);
        }

        [Route("doesUserExist/{usrName}")]
        [HttpGet]
        public bool doesUserExist(string usrName)
        {
            INF370Entities db = new INF370Entities();
            foreach (USER usr in db.USERs)
            {
                if (usr.USERNAME == usrName)
                {
                    return true;
                }
            }
            return false;
        }
        [HttpPost]
        [Route("InsertEmployeeDetails")]
        public IHttpActionResult PostOwner(EMPLOYEE data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.EMPLOYEEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }



            return Ok(data);
        }


        //[HttpPut]
        //[Route("UpdateEmployeeDetails")]
        //public IHttpActionResult PutOwnerMaster(EMPLOYEE Employee)
        //{

        //    db.Configuration.ProxyCreationEnabled = false;
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    try
        //    {
        //        EMPLOYEE objEmp = new EMPLOYEE();
        //        objEmp = db.EMPLOYEEs.Find(Employee.EMPLOYEEID);
        //        if (objEmp != null)
        //        {
        //            objEmp.USERID = Employee.USERID;
        //            objEmp.EMPLOYEETYPEID = Employee.EMPLOYEETYPEID;
        //            objEmp.NAME = Employee.NAME;
        //            objEmp.SURNAME = Employee.SURNAME;
        //            objEmp.EMPLOYEENATIONALID = Employee.EMPLOYEENATIONALID;
        //            objEmp.EMPLOYEEPASSPORTNO = Employee.EMPLOYEEPASSPORTNO;
        //            objEmp.DATEEMPLOYED = Employee.DATEEMPLOYED;
        //            objEmp.DATEOFBIRTH = Employee.DATEOFBIRTH;

        //        }
        //        int i = this.db.SaveChanges();

        //    }
        //    catch (Exception)
        //    {
        //        return null;

        //    }
        //    return Ok(Employee);
        //}


        //[HttpDelete]
        //[Route("DeleteEmployeeDetails")]
        //public IHttpActionResult DeleteEmp(int id)
        //{
        //    INF370Entities db = new INF370Entities();
        //    db.Configuration.ProxyCreationEnabled = false;

        //    try
        //    {
        //        EMPLOYEE employeeDetails = db.EMPLOYEEs.Find(id);
        //        if (employeeDetails == null)
        //        {
        //            return NotFound();
        //        }

        //        db.EMPLOYEEs.Remove(employeeDetails);
        //        db.SaveChanges();

        //        return Ok(employeeDetails);
        //    }
        //    catch (Exception)
        //    {

        //        return null;
        //    }
        
        //}

        //---------------------------------- Employee LOGIN ------------------------

        [Route("EmployeeLogin")]
        [HttpPost]
        public dynamic EmployeeLogin([FromBody] USER usr)
        {
            //check if user exists
            USER checkUserExist = db.USERs.Where(usrw => usrw.USERNAME == usr.USERNAME).FirstOrDefault();
            if (checkUserExist == null)
            {
                dynamic retEmptyUser = new ExpandoObject();
                retEmptyUser.Message = "Invalid User!";
                return retEmptyUser;
            }

            var hash = GenerateHash(ApplySomeSalt(usr.PASSWORD));
            USER usrr = db.USERs.Include(zz => zz.USERTYPE)
                             .Include(zz => zz.EMPLOYEEs).Where(usrw => usrw.USERNAME == usr.USERNAME && usrw.PASSWORD == hash)
                             
                             .FirstOrDefault();
            if (usrr != null  &&usrr.USERTYPEID!=2)
            {
                EMPLOYEE employeeDetails = db.EMPLOYEEs.Where(zz => zz.USERID == usrr.USERID).FirstOrDefault();

                dynamic natUser = new ExpandoObject();
                natUser.EmployeeID = employeeDetails.EMPLOYEEID;
                natUser.UserID = employeeDetails.USERID;
                natUser.EmployeeTypeID = employeeDetails.EMPLOYEETYPEID;
                natUser.EmployeeName = employeeDetails.NAME;
                natUser.EmployeeSurname = employeeDetails.SURNAME;
                natUser.EmployeeCellNumber = employeeDetails.PHONE_NUMBER;
                natUser.EmployeeEmail = employeeDetails.EMAIL;
                natUser.EmployeeEmploymentStatus = employeeDetails.ACTIVE;
                return natUser;
            }
            else
            {
                dynamic natUser = new ExpandoObject();
                natUser.Message = "Invalid User!";
                return natUser;
            }
        }

        public static string ApplySomeSalt(string input)
        {
            return input + "tepszgjoowiwccuvckqinnimxxjbbmukxompumnmyugjnwehrnldjsdjygjo";
        }

        public static string GenerateHash(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }


    }
}

