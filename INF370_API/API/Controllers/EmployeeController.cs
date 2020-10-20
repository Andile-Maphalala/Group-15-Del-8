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

        [HttpGet]
        [Route("GetAllEmployees")]
        public List<EMPLOYEE> GetAllEmployees()
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.EMPLOYEEs.Where(gg=>gg.EMPLOYEETYPEID!=1).ToList();
            }
            catch (Exception)
            {
                return null;

            }
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


        [HttpDelete]
        [Route("DeleteEmployeeDetails")]
        public IHttpActionResult DeleteEmp(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                EMPLOYEE employeeDetails = db.EMPLOYEEs.Find(id);
                if (employeeDetails == null)
                {
                    return NotFound();
                }

                db.EMPLOYEEs.Remove(employeeDetails);
                db.SaveChanges();

                return Ok(employeeDetails);
            }
            catch (Exception)
            {

                return null;
            }
        
        }

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

