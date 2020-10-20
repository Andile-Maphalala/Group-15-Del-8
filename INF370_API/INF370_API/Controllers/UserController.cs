using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;
using System.Web.Cors;
using System.Web;
using INF370_API.ViewModels;
using System.Data.Entity;
using System.Web.Http.Cors;
using System.Text;
using System.Security.Cryptography;
using Newtonsoft.Json;
using System.IO;
using System.Net.Mail;

namespace INF370_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {

        //    dynamic response = new ExpandoObject();
        //    response.Name = rental.Customer.Name;
        //                response.Cell = rental.Customer.Cell;
        //                response.Email = rental.Customer.Email;
        //                response.RentalID = rental.RentalID;
        //                response.RentalDate = rental.Date;
        //                List<dynamic> TheList = new List<dynamic>();
        //                foreach (var line in rentalLine)
        //                {
        //                    dynamic item = new ExpandoObject();
        //    item.Description = line.Rentable.Description;
        //                    item.PricePerDay = line.Rentable.PricePerDay;
        //                    item.StartDate = line.StartDate;
        //                    item.EndDate = line.EndDate;
        //                    item.Days = line.EndDate - line.StartDate;
        //                    item.LinePrice = item.PricePerDay* item.Days;
        //    TheList.Add(item);
        //                }
        //response.RentalLines = TheList;
        INF370Entities db = new INF370Entities();

        [Route("api/User/GetAllUsers")]
        [HttpGet]
        public List<dynamic> GetAllUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            //List<CLIENT> List = new List<CLIENT>();
            //List = db.CLIENTs.Include(z => z.USER).ToList();

            try
            {
                List<dynamic> ClientList = new List<dynamic>();
                foreach (var x in db.USERs.Include(zz => zz.USERTYPE))
                {
                    dynamic clientUser = new ExpandoObject();
                    //clientUser.UserID = x.USERID;
                    clientUser.Username = x.USERNAME;
                    if (x.USERTYPEID == 2)
                    {
                        CLIENT client = db.CLIENTs.Where(zz => zz.USERID == x.USERID).FirstOrDefault();
                        //clientUser.ClientID = client.CLIENTID;
                        clientUser.Name = client.NAME;
                        clientUser.Surname = client.SURNAME;
                        clientUser.PhoneNo = client.PHONENUMBER;
                        clientUser.Email = client.EMAIL;
                        clientUser.UserType = x.USERTYPE.USERTYPEDESCRIPTION;
                    }
                    else if (x.USERTYPEID != 2)
                    {
                        EMPLOYEE emp = db.EMPLOYEEs.Where(zz => zz.USERID == x.USERID).FirstOrDefault();
                        clientUser.Name = emp.NAME;
                        clientUser.Surname = emp.SURNAME;
                        clientUser.PhoneNo = emp.PHONE_NUMBER;
                        clientUser.Email = emp.EMAIL;
                        clientUser.UserType = x.USERTYPE.USERTYPEDESCRIPTION;
                    }

                    ClientList.Add(clientUser);
                }


                return ClientList;
            }
            catch (Exception)
            {
                return null;
            }
        }




        //List<ClientUser> ClientList = new List<ClientUser>();
        //        foreach(var x in db.USERs)
        //        {
        //            ClientUser clientuser = new ClientUser();
        //clientuser.USERID = x.USERID;
        //            clientuser.Username = x.USERNAME;
        //            clientuser.Password = x.PASSWORD;
        //            clientuser.NAME = x.CLIENT.NAME;
        //            clientuser.SURNAME = x.CLIENT.SURNAME;
        //            clientuser.PHONENUMBER = x.CLIENT.PHONENUMBER;
        //            clientuser.EMAIL = x.CLIENT.EMAIL;
        //            clientuser.PASSPORTNO = x.CLIENT.ID_PASSPORT_NO__;
        //            clientuser.NATIONALITY = x.CLIENT.NATIONALITY;
        //            clientuser.DATE_OF_BIRTH = x.CLIENT.DATE_OF_BIRTH;
        //            clientuser.ISSTUDENT = x.CLIENT.ISSTUDENT;
        //            clientuser.RESIDENTIAL_ADDRESS = x.CLIENT.RESIDENTIAL_ADDRESS;
        //            clientuser.POSTAL_ADDRESS = x.CLIENT.POSTAL_ADDRESS;
        //            clientuser.NAME_OF_EMPLOYER = x.CLIENT.NAME_OF_EMPLOYER;
        //            clientuser.OCCUPATION = x.CLIENT.OCCUPATION;
        //            clientuser.WORK_ADDRESS = x.CLIENT.WORK_ADDRESS;
        //            clientuser.WORK_TEL_NO = x.CLIENT.WORK_TEL__NO;
        //            clientuser.GROSS_SALARY = x.CLIENT.GROSS_SALARY;
        //            ClientList.Add(clientuser);






        //        bool uExists = UserExists(user.UserName);
        //        db.Configuration.ProxyCreationEnabled = false;

        //            NatUser cUser = new NatUser();
        //        cUser.UserRoleID = 1;
        //            var hash = GenerateHash(ApplySomeSalt(user.UserPassword));
        //        cUser.UserPassword = hash;
        //            cUser.UserName = user.UserName;
        //            cUser.UserPasswordChangeRequest = false;

        //            if (uExists == false)
        //            {
        //                    //Adding new user

        //                try
        //                {
        //                    db.NatUsers.Add(cUser);
        //                    db.SaveChanges();
        //                }
        //                catch(Exception e)
        //                {

        //                }
        //var response = Request.CreateResponse(HttpStatusCode.OK, cUser);
        //                return response;
        //            } else
        //            {
        //                var response = Request.CreateResponse(HttpStatusCode.BadRequest, "user Exists");
        //                return response;
        //            }

        [Route("api/User/doesUserExist/{usrName}")]
        [HttpGet]
        public string doesUserExist(string usrName)
        {
            INF370Entities db = new INF370Entities();

            foreach (USER usr in db.USERs)
            {
                if (usr.USERNAME == usrName)
                {
                    return "true";
                }
            }
            return "false";
        }

        [Route("api/User/Audit")]
        [HttpGet]
        public List<dynamic> AuditData()
        {
            db.Configuration.ProxyCreationEnabled = false;

            dynamic response = new ExpandoObject();
            // var audits = db.tbl_test_audit_trail;
            // db.tbl_test_audit_trail.ToList();

            List<dynamic> TheList = new List<dynamic>();
            foreach (tbl_test_audit_trail audit in db.tbl_test_audit_trail
)
            {
                dynamic item = new ExpandoObject();
                item.DateAccessed = Convert.ToDateTime(audit.audit_datetime_utc).ToString("yyyy-MM-dd HH:mm:ss tt");
                item.TableAccessed = audit.table_name;
                var user = Convert.ToInt32(audit.audit_user);
                item.User = db.EMPLOYEEs.Where(kk => kk.USERID == user).Select(kk => kk.NAME).FirstOrDefault() + " " + db.EMPLOYEEs.Where(kk => kk.USERID == user).Select(kk => kk.SURNAME).FirstOrDefault();

                item.Type = audit.audit_type;
                if (audit.audit_type == "Create")
                {
                    string pk = string.Empty;
                    string newd = string.Empty;
                    string strin = string.Empty;
                    item.ChangedColumn = audit.changed_columns;
                    dynamic details = JsonConvert.DeserializeObject(audit.new_values);
                    foreach (var uu in details)
                    {
                        var vvv = uu.Type.GetType();
                        if (uu.Value.Type.ToString() != "Array")
                        {

                            var yy = uu.Name + ": " + uu.Value.Value + ", ";
                            newd += yy;

                        }



                    }


                    item.NewDescription = newd.Substring(0, newd.Length - 2);




                }
                else if (audit.audit_type == "Update")
                {
                    string pk = string.Empty;
                    string newd = string.Empty;
                    string strin = string.Empty;

                    var ad = JsonConvert.DeserializeObject(audit.changed_columns);
                    item.ChangedColumn = JsonConvert.DeserializeObject(audit.changed_columns);

                    dynamic detail = JsonConvert.DeserializeObject(audit.old_values);
                    foreach (var uu in detail)
                    {
                        var vvv = uu.Type.GetType();
                        if (uu.Value.Type.ToString() != "Array")
                        {

                            var yy = uu.Name + ": " + uu.Value.Value + ", ";
                            pk += yy;

                        }



                    }

                    dynamic details = JsonConvert.DeserializeObject(audit.new_values);
                    foreach (var uu in details)
                    {
                        var vvv = uu.Type.GetType();
                        if (uu.Value.Type.ToString() != "Array")
                        {

                            var yy = uu.Name + ": " + uu.Value.Value + ", ";
                            newd += yy;

                        }



                    }



                    var vv = JsonConvert.DeserializeObject(audit.old_values);
                    strin += string.Format(audit.table_name + " data  was updated from  \n\n\n Old Data: {0}  To \n\n\n {1}", pk.Substring(0, pk.Length - 2), newd.Substring(0, newd.Length - 2));


                    //StringBuilder strResult = new StringBuilder();
                    //strResult.Append(audit.table_name + " data  was updated from\n");
                    //strResult.Append("Old data :\n");
                    //strResult.Append(pk);
                    //strResult.Append("New data :\n");
                    //strResult.Append(newd);
                    item.OldDescription = pk.Substring(0, pk.Length - 2);
                    item.NewDescription = newd.Substring(0, newd.Length - 2);





                }
                else if (audit.audit_type == "Delete")
                {
                    string pk = string.Empty;
                    string newd = string.Empty;
                    string strin = string.Empty;
                    dynamic detail = JsonConvert.DeserializeObject(audit.old_values);
                    foreach (var uu in detail)
                    {
                        var vvv = uu.Type.GetType();
                        if (uu.Value.Type.ToString() != "Array")
                        {

                            var yy = uu.Name + ": " + uu.Value.Value + ", ";
                            pk += yy;

                        }



                    }

                    item.ChangedColumn = "Deleted";

                    item.OldDescription = pk.Substring(0, pk.Length - 2);



                }







                //item.PricePerDay = line.Rentable.PricePerDay;
                //item.StartDate = line.StartDate;
                //item.EndDate = line.EndDate;
                //item.Days = line.EndDate - line.StartDate;
                //item.LinePrice = item.PricePerDay * item.Days;
                TheList.Add(item);
            }
            return TheList;


        }
        //[Route("api/User/AddUser")]
        //[HttpPost]
        //public dynamic AddUser(dynamic myUser)
        //{


        //    CLIENT client = new CLIENT();
        //    USER user = new USER();

        //    //Save to DB
        //    try
        //    {
        //        user.USERNAME = myUser.Username;
        //        string passString = myUser["Password"];
        //        var hash = GenerateHash(ApplySomeSalt(passString));
        //        user.PASSWORD = hash;
        //        user.USERTYPEID = 2;
        //        user.UserPasswordChangeRequest = false;
        //        db.USERs.Add(user);
        //        db.SaveChanges();
        //        USER createdUser = new USER();

        //        createdUser = db.USERs.Where(zz => zz.USERNAME == user.USERNAME).FirstOrDefault();
        //        client.USERID = createdUser.USERID;
        //        client.NAME = myUser.Name;
        //        client.SURNAME = myUser.Surname;
        //        client.EMAIL = myUser.Email;
        //        client.PHONENUMBER = myUser.PhoneNo;
        //        client.PASSPORT_NO = myUser.PassportNo;
        //        client.ID = myUser.IdNo;
        //        client.NATIONALITY = myUser.Nationality;
        //        client.DATE_OF_BIRTH = myUser.DOB;
        //        client.ISSTUDENT = myUser.IsStudent;
        //        client.RESIDENTIAL_ADDRESS = myUser.Residental;
        //        client.POSTAL_ADDRESS = myUser.Postal;
        //        client.NAME_OF_EMPLOYER = myUser.Employer;
        //        client.OCCUPATION = myUser.Occupation;
        //        client.WORK_ADDRESS = myUser.WorkAddress;
        //        client.WORK_TEL__NO = myUser.WorkTel;
        //        client.GROSS_SALARY = myUser.GrossSalary;
        //        db.CLIENTs.Add(client);
        //        db.SaveChanges();



        //    }
        //    catch (Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error With client Details");
        //    }
        //    return Request.CreateResponse(HttpStatusCode.Created);

        //}

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

        [Route("api/User/GetUserByID/{ID}")]
        [HttpGet]
        public dynamic GetUserByID(int ID)
        {
            dynamic myUser = new ExpandoObject();
            CLIENT client = new CLIENT();
            client = db.CLIENTs.Where(zz => zz.USERID == ID).FirstOrDefault();
            try
            {
                myUser.Name = client.NAME;
                myUser.Surname = client.SURNAME;
                myUser.Email = client.EMAIL;
                myUser.PhoneNo = client.PHONENUMBER;
                myUser.PassportNo = client.PASSPORT_NO;
                myUser.IdNo = client.ID;
                myUser.Nationality = client.NATIONALITY;
                var dob = Convert.ToDateTime(client.DATE_OF_BIRTH);
                var modi = dob.ToShortDateString();
                myUser.DOB = client.DATE_OF_BIRTH;
                myUser.IsStudent = client.ISSTUDENT;
                myUser.Residental = client.RESIDENTIAL_ADDRESS;
                myUser.Postal = client.POSTAL_ADDRESS;
                myUser.Employer = client.NAME_OF_EMPLOYER;
                myUser.Occupation = client.OCCUPATION;
                myUser.WorkAddress = client.WORK_ADDRESS;
                myUser.WorkTel = client.WORK_TEL__NO;
                myUser.GrossSalary = client.GROSS_SALARY;

                return myUser;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        [Route("api/User/UpdateUser")]
        [HttpPost]
        public dynamic UpdateUser(dynamic myUser)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CLIENT client = new CLIENT();



            //Save to DB
            try
            {
                int UserID = myUser.ID;
                client = db.CLIENTs.Where(zz => zz.USERID == UserID).FirstOrDefault();

                client.NAME = myUser.Name;
                client.SURNAME = myUser.Surname;
                client.EMAIL = myUser.Email;
                client.PHONENUMBER = myUser.PhoneNo;
                client.PASSPORT_NO = myUser.PassportNo;
                client.ID = myUser.IdNo;
                client.NATIONALITY = myUser.Nationality;
                client.DATE_OF_BIRTH = myUser.DOB;
                client.ISSTUDENT = myUser.IsStudent;
                client.RESIDENTIAL_ADDRESS = myUser.Residental;
                client.POSTAL_ADDRESS = myUser.Postal;
                client.NAME_OF_EMPLOYER = myUser.Employer;
                client.OCCUPATION = myUser.Occupation;
                client.WORK_ADDRESS = myUser.WorkAddress;
                client.WORK_TEL__NO = myUser.WorkTel;
                client.GROSS_SALARY = myUser.GrossSalary;

                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return false;
                }


            }
            catch (Exception e)
            {
                return false;
            }
            return true;

        }


        [Route("api/User/Deactivate")]
        [HttpPost]
        public dynamic Deactivate(dynamic myUser)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CLIENT client = new CLIENT();
            DEACTIVATEDUSER deactivate = new DEACTIVATEDUSER();

            try
            {
                deactivate.DEACTIVATE_REASON = myUser.Reason;
                deactivate.DEACTIVATE_DATETIME = DateTime.Now;
                deactivate.USERID = Convert.ToInt16(myUser.UserID);

                db.DEACTIVATEDUSERs.Add(deactivate);
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return false;
            }

            return true;

        }

        [Route("api/User/CheckUsername/{myUser}")]
        [HttpGet]
        public dynamic CheckUsername(string myUser)
        {
            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            USER user = new USER();

            try
            {
                string Username = myUser;
                user = db.USERs.Where(zz => zz.USERNAME == Username).FirstOrDefault();


            }
            catch (Exception e)
            {
                return false;
            }

            dynamic Check = new ExpandoObject();
            if (user != null)
            {
                Check.Found = true;
                return Check;
            }
            else
            {
                Check.Found = false;
                return Check;
            }

        }

        [Route("api/User/AddUser")]
        [HttpPost]
        public dynamic AddUser(dynamic myUser)
        {


            CLIENT client = new CLIENT();
            USER user = new USER();

            //Save to DB
            try
            {
                // set random length 6 OTP
                Random random = new Random();
                client.OTP = random.Next(100000, 999999).ToString();
                user.USERNAME = myUser.Username;
                string passString = myUser["Password"];
                var hash = GenerateHash(ApplySomeSalt(passString));
                user.PASSWORD = hash;
                user.USERTYPEID = 2;
                user.UserPasswordChangeRequest = false;
                db.USERs.Add(user);
                db.SaveChanges();
                USER createdUser = new USER();

                createdUser = db.USERs.Where(zz => zz.USERNAME == user.USERNAME).FirstOrDefault();
                client.USERID = createdUser.USERID;
                client.NAME = myUser.Name;
                client.SURNAME = myUser.Surname;
                client.EMAIL = myUser.Email;
                client.PHONENUMBER = myUser.PhoneNo;
                client.PASSPORT_NO = myUser.PassportNo;
                client.ID = myUser.IdNo;
                client.NATIONALITY = myUser.Nationality;
                client.DATE_OF_BIRTH = myUser.DOB;
                client.ISSTUDENT = myUser.IsStudent;
                client.RESIDENTIAL_ADDRESS = myUser.Residental;
                client.POSTAL_ADDRESS = myUser.Postal;
                client.NAME_OF_EMPLOYER = myUser.Employer;
                client.OCCUPATION = myUser.Occupation;
                client.WORK_ADDRESS = myUser.WorkAddress;
                client.WORK_TEL__NO = myUser.WorkTel;
                client.GROSS_SALARY = myUser.GrossSalary;
                client.verified = false;
                db.CLIENTs.Add(client);
                db.SaveChanges();

                try
                {

                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("t4596334@gmail.com");
                    mail.To.Add(client.EMAIL);
                    mail.Subject = "Inturbidus: Verify Account";
                    mail.Body = "Good day " + client.NAME + " " + client.SURNAME + "\n\n Your registration was successful. Please verify your account with this OTP: " + client.OTP +"\n\n Navigate to Manage My Account to verify your account.  ";

                    SmtpServer.Port = 587;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                    SmtpServer.EnableSsl = true;

                    SmtpServer.Send(mail);



                }
                catch (Exception e)
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                return false;
            }
            return true;

        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [Route("api/User/ResendOTP")]
        [HttpPost]
        public dynamic ResendWithOTP(dynamic otpObject)
        {
            int clientID = otpObject.cID;
            var clients = db.CLIENTs.Where(z => z.CLIENTID == clientID).FirstOrDefault();
            if (clients.OTP == null)
            {

                Random random = new Random();
                clients.OTP = random.Next(100000, 999999).ToString();
                db.SaveChanges();
            }




            try
            {

                string otp = otpObject.addr;
                CLIENT client = db.CLIENTs.Where(I => I.CLIENTID == clientID).FirstOrDefault();
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("t4596334@gmail.com");
                mail.To.Add(client.EMAIL);
                mail.Subject = "Inturbidus: Resend OTP";
                mail.Body = "Good day " + client.NAME + " " + client.SURNAME + "\n Your OTP Is: " + client.OTP;

                SmtpServer.Port = 587;
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new System.Net.NetworkCredential("t4596334@gmail.com", "test123@123test");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);

            }
            catch { return false; }

            return false;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [Route("api/User/VerifyWithOTP")]
        [HttpPost]
        public bool VerifyWithOTP(dynamic otpObject)
        {
            try
            {
                int clientID = otpObject.cID;
                string otp = otpObject.addr;
                CLIENT clt = db.CLIENTs.Where(I => I.CLIENTID == clientID).FirstOrDefault();
                if (clt != null)
                {
                    if (otp == clt.OTP)
                    {
                        clt.verified = true;
                        db.Entry(clt).State = EntityState.Modified;
                        db.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }




        }

        [Route("api/User/check/{ID}")]
        public List<dynamic> Getagreement(int ID)
        {



            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            return verify(db.CLIENTs.Where(zz => zz.CLIENTID == ID && zz.verified == true).ToList());

        }
        private List<dynamic> verify(List<CLIENT> forbros)
        {
            List<dynamic> dynamicduedates = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            foreach (CLIENT dd in forbros)
            {
                dynamic dynamicduedate = new ExpandoObject();
                dynamicduedate.clientID = dd.CLIENTID;




                dynamicduedates.Add(dynamicduedate);
            }
            return dynamicduedates;
        }


    }
}



