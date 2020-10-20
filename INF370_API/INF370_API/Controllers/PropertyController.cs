using INF370_API.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Data.Entity;

namespace INF370_API.Controllers
{

    [RoutePrefix("Api/Property")]

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PropertyController : ApiController
    {
        INF370Entities img = new INF370Entities();
        [HttpPost]
        [Route("UploadFiles")]
        public string UploadFiles()
        {
            int propertyId = int.Parse(db.PROPERTies
                        .OrderByDescending(p => p.PROPERTYID)
                        .Select(r => r.PROPERTYID)
                        .First().ToString());

           
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Images/");
            var request = System.Web.HttpContext.Current.Request;
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            //var remark = request["remark"].ToString();
            if (hfc!=null)
            {
                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    string FileName = (Path.GetFileName(hpf.FileName));
                    //if (!File.Exists(sPath + FileName))
                    //{
                        // SAVE THE FILES IN THE FOLDER.  
                        hpf.SaveAs(sPath + FileName);
                        PROPERTYPHOTO obj = new PROPERTYPHOTO();
                        obj.PHOTO = FileName;
                        obj.PROPERTYID = propertyId;
                        img.PROPERTYPHOTOes.Add(obj);
                        img.SaveChanges();
                    //}
                }
            }
            }
            return "Upload Failed";
        }

        [HttpPost]
        [Route("UploadUpdatedFiles")]
        public string UploadUpdatedFiles()
        {
            


            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Images/");
            var request = System.Web.HttpContext.Current.Request;
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            //var remark = request["remark"].ToString();
            if (hfc != null)
            {
                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    System.Web.HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        string FileName = (Path.GetFileName(hpf.FileName));
                        //if (!File.Exists(sPath + FileName))
                        //{
                        // SAVE THE FILES IN THE FOLDER.  
                        hpf.SaveAs(sPath + FileName);
                        PROPERTYPHOTO obj = new PROPERTYPHOTO();
                        obj.PHOTO = FileName;
                        obj.PROPERTYID = Convert.ToInt32(request["PropertyID"]);
                        img.PROPERTYPHOTOes.Add(obj);
                        img.SaveChanges();
                        //}
                    }
                }
            }
            return "Upload Failed";
        }


        [HttpGet]
        [Route("AddCount/{ID}")]
        public dynamic AddCount(int ID)
        {

            try
            {
                int? propertyID = db.PROPERTies.Where(kk => kk.PROPERTYID == ID).Select(hh => hh.PROPERTYTYPEID).FirstOrDefault();

                PROPERTYTYPE addcount = db.PROPERTYTYPEs.Where(ll => ll.PROPERTYTYPEID == propertyID).FirstOrDefault();
                var counter = addcount.TIMESVISITED;

                addcount.TIMESVISITED = counter+1;
                db.SaveChanges();
            }
            catch (Exception)
            {

                return null;
            }

            return Ok();





        }

        [HttpGet]
        [Route("AllPropertyDetailsAgents/{ID}")]
        public List<dynamic> GetPropertyAgent(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return GetAllProperty(db.PROPERTies.Where(ll=>ll.AGENT_ID==ID).ToList());
            }
            catch (Exception)
            {
                return null;
            }
        }






        INF370Entities db = new INF370Entities();

            [HttpGet]
            [Route("AllPropertyDetails")]
            public List<dynamic> GetProperty()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
                {
                    return GetAllProperty(db.PROPERTies.ToList());
                }
                catch (Exception)
                {
                    return null;
                }
            }

       
        public dynamic PropertyDetails(int ID)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
        
            try
            {
                PROPERTY prop = new PROPERTY();
                return null;
            }

            catch (Exception)
            {
                return null;
            }
        }


        public List<dynamic> GetAllProperty(List<PROPERTY> props)
        {
            List<dynamic> dynamicProps = new List<dynamic>();
            INF370Entities db = new INF370Entities();


            foreach(PROPERTY property in props)
            {


                List<dynamic> dynamicPhotos = new List<dynamic>();


                //PROPERTY property = db.PROPERTies.Where(kk => kk.PROPERTYID == ID).FirstOrDefault();
                dynamic objEmp = new ExpandoObject();
            //objEmp.Property = forbr
            objEmp.PROPERTYID = property.PROPERTYID;
            objEmp.PROPERTYSTATUSID =db.PROPERTYSTATUS.Where(hh=>hh.PROPERTYSTATUSID== property.PROPERTYSTATUSID).Select(jj=>jj.PROPERTYSTATUSNAME).FirstOrDefault();
            objEmp.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
            ;
            objEmp.AGENT_ID = db.AGENTs.Where(vvs => vvs.AGENT_ID == property.AGENT_ID).Select(jj => jj.NAME).FirstOrDefault() +" @ "+  db.AGENTs.Where(vvs => vvs.AGENT_ID == property.AGENT_ID).Select(jj => jj.COMPANY).FirstOrDefault();

            objEmp.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
            objEmp.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
            var CITYID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.CITYID).FirstOrDefault();
            objEmp.CITY = db.CITies.Where(hh => hh.CITYID == CITYID).Select(jj => jj.CITYNAME).FirstOrDefault();
            var PROVINCEID = db.CITies.Where(hh => hh.CITYID == CITYID).Select(jj => jj.PROVINCEID).FirstOrDefault();
            objEmp.PROVINCE = db.PROVINCEs.Where(hh => hh.PROVINCEID == PROVINCEID).Select(jj => jj.PROVINCENAME).FirstOrDefault();
            objEmp.ADDRESS = property.ADDRESS;
            objEmp.SIZE = property.SIZE;
            objEmp.NUMBBATH = property.NUMBBATH;
            objEmp.NUMBED = property.NUMBED;
            objEmp.GARDEN = property.GARDEN;
            objEmp.ADDITIONALINFO = property.ADDITIONALINFO;
            objEmp.LISTINGDATE = property.LISTINGDATE;
            var amnt = db.RENTALAMOUNTs.Where(jj => jj.PROPERTYID == property.PROPERTYID).FirstOrDefault();
            objEmp.RentalAmount = amnt.AMOUNT;

                List<PROPERTYPHOTO> photos = db.PROPERTYPHOTOes.Where(gg => gg.PROPERTYID == property.PROPERTYID).ToList();
                foreach (PROPERTYPHOTO photo in photos)
                {
                    dynamic dynamicPic = new ExpandoObject();
                    dynamicPic.PROPERTYID = photo.PROPERTYID;
                    dynamicPic.PHOTO = photo.PHOTO;
                    dynamicPic.PROPERTY_PHOTO_ID = photo.PROPERTY_PHOTO_ID;


                    dynamicPhotos.Add(dynamicPic);

                }
                objEmp.photo = dynamicPhotos;
                dynamicProps.Add(objEmp);

            }





            return dynamicProps;
        }



        [HttpGet]
        [Route("PropertyDetails/{ID}")]
        public dynamic GetProperty(int ID)
        {
            List<dynamic> dynamicPhotos = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            PROPERTY property = db.PROPERTies.Where(kk => kk.PROPERTYID == ID).FirstOrDefault();
            dynamic objEmp = new ExpandoObject();
            //objEmp.Property = forbros;
            objEmp.PROPERTYID = property.PROPERTYID;
            objEmp.PROPERTYSTATUSID = property.PROPERTYSTATUSID;
            objEmp.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTYTYPEID).FirstOrDefault();
            ;
            objEmp.AGENT_ID = property.AGENT_ID;
            objEmp.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
            objEmp.AREAID = property.AREAID;
            objEmp.CITYID = db.AREAs.Where(hh => hh.AREAID == property.AREAID).Select(jj => jj.CITYID).FirstOrDefault();
            var cityid = db.AREAs.Where(hh => hh.AREAID == property.AREAID).Select(jj => jj.CITYID).FirstOrDefault();
            objEmp.PROVINCEID = db.CITies.Where(jj =>jj.CITYID == cityid).Select(jj => jj.PROVINCEID).FirstOrDefault();
          

            objEmp.ADDRESS = property.ADDRESS;
            objEmp.SIZE = property.SIZE;
            objEmp.NUMBBATH = property.NUMBBATH;
            objEmp.NUMBED = property.NUMBED;
            objEmp.GARDEN = property.GARDEN;
            objEmp.ADDITIONALINFO = property.ADDITIONALINFO;
            objEmp.LISTINGDATE = property.LISTINGDATE;
            objEmp.AVAILABLEDATE = property.AVAILABLEDATE;



            var amnt = db.RENTALAMOUNTs.Where(jj => jj.PROPERTYID == property.PROPERTYID).FirstOrDefault();
            objEmp.RentalAmount = amnt.AMOUNT;
            List<PROPERTYPHOTO> photos= db.PROPERTYPHOTOes.Where(gg => gg.PROPERTYID == property.PROPERTYID).ToList();
            foreach (PROPERTYPHOTO photo in photos)
            {
                dynamic dynamicPic = new ExpandoObject();
                dynamicPic.PROPERTYID = photo.PROPERTYID;
               
                string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo.PHOTO);
                try
                {
                    using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            fileStream.CopyTo(memoryStream);
                            Bitmap image = new Bitmap(1, 1);
                            image.Save(memoryStream, ImageFormat.Png);

                            byte[] byteImage = memoryStream.ToArray();
                            string base64String = Convert.ToBase64String(byteImage);
                            dynamicPic.PHOTO = "data:image/png;base64," + base64String;
                        }
                    }
                }
                catch
                {
                    dynamicPic.PHOTO = "";
                }



               

                dynamicPhotos.Add(dynamicPic);

            }

            objEmp.photo = dynamicPhotos;

          
      
            return objEmp;
        }



        [HttpGet]
        [Route("DeletePhoto/{ID}")]
        public dynamic DeletePhoto(int ID)
        {
            try
            {
                PROPERTYPHOTO foto = new PROPERTYPHOTO();
                foto = db.PROPERTYPHOTOes.Where(rr => rr.PROPERTY_PHOTO_ID == ID).FirstOrDefault();


                db.PROPERTYPHOTOes.Remove(foto);
                db.SaveChanges();
            }
            catch (Exception)
            {

                return "not finished";
            }
           



            return "finished";
        }


        [HttpGet]
        [Route("GetPhoto/{ID}")]
        public dynamic GetPhoto(int ID)
        {
            PROPERTY property = db.PROPERTies.Where(kk => kk.PROPERTYID == ID).FirstOrDefault();

            try
            {
                List<dynamic> dynamicPhotos = new List<dynamic>();

                List<PROPERTYPHOTO> photos = db.PROPERTYPHOTOes.Where(gg => gg.PROPERTYID == property.PROPERTYID).ToList();
                foreach (PROPERTYPHOTO photo in photos)
                {
                    dynamic dynamicPic = new ExpandoObject();
                    dynamicPic.PROPERTYID = photo.PROPERTYID;
                    dynamicPic.PROPERTY_PHOTO_ID = photo.PROPERTY_PHOTO_ID;

                    string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo.PHOTO);
                    try
                    {
                        using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                fileStream.CopyTo(memoryStream);
                                Bitmap image = new Bitmap(1, 1);
                                image.Save(memoryStream, ImageFormat.Png);

                                byte[] byteImage = memoryStream.ToArray();
                                string base64String = Convert.ToBase64String(byteImage);
                                dynamicPic.PHOTO = "data:image/png;base64," + base64String;
                            }
                        }
                    }
                    catch
                    {
                        dynamicPic.PHOTO = "";
                    }

            



                    dynamicPhotos.Add(dynamicPic);

                }



                return dynamicPhotos;

                //return db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == ID).ToList();
            }
            catch (Exception)
            {

                return "not finished";
            }




       
        }








        [HttpGet]
        [Route("GetPropertyTypes")]
        public IQueryable<PROPERTYTYPE> GetPropertyTypes()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PROPERTYTYPEs;
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
            [Route("GetPropertyDetailsById/{propertyId}")]
            public IHttpActionResult GetPropertyById(string propertyId)
            {
                PROPERTY objEmp = new PROPERTY();
                try
            {
                int ID = Convert.ToInt32(propertyId);

                objEmp = db.PROPERTies.Find(ID);
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
        [Route("GetCities/{ID}")]
        [HttpGet]
        public List<dynamic> GetCities(int ID)
        {
            var cities = db.CITies.Where(kk => kk.PROVINCEID == ID).ToList();

            List<dynamic> toReturn = new List<dynamic>();
     
            foreach (CITY city in cities)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.CITYID;
                dynamicProperty.Name = city.CITYNAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("GetAreas/{ID}")]
        [HttpGet]
        public List<dynamic> GetAreas(int ID)
        {
            var areas = db.AREAs.Where(hh => hh.CITYID == ID).ToList();

            List<dynamic> toReturn = new List<dynamic>();
     
            foreach (AREA city in areas)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.AREAID;
                dynamicProperty.Name = city.AREANAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }












        [Route("AddProperty")]
        [HttpPost]
        public dynamic AddProperty(dynamic property)
        {
            

            db.Configuration.ProxyCreationEnabled = false;
            var httpRequest = System.Web.HttpContext.Current.Request;
            PROPERTY prop = new PROPERTY();
            

        
            try
            {

              //  string areaname = property.AREA;
               // string propertype = property.PROPERTYTYPE;
              //  AREA area = db.AREAs.Where(zz => zz.AREANAME == areaname).FirstOrDefault();
              //  PROPERTYTYPE type = db.PROPERTYTYPEs.Where(zz => zz.PROPERTTYPEDESCRIPTION == propertype).FirstOrDefault();
                prop.AREAID = property.AREA;
                prop.PROPERTYTYPEID = property.PROPERTYTYPE;
                prop.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                prop.ADDRESS = property.ADDRESS;
                prop.SIZE = property.SIZE;
                prop.NUMBED = property.NUMBED;
                prop.NUMBBATH = property.NUMBBATH;
                prop.GARDEN = property.GARDEN;
                prop.ADDITIONALINFO = property.ADDITIONALINFO;
                prop.PROPERTYSTATUSID = 1;
                prop.LISTINGDATE = DateTime.Now.Date;
                prop.AVAILABLEDATE = property.AVAILABLEDATE;
                prop.IsExtending = false;

                db.PROPERTies.Add(prop);
                db.SaveChanges();

            }
            catch (Exception)
            {
                return null;
            }

            try
            {
                RENTALAMOUNT amnt = new RENTALAMOUNT();


                int propertyId = int.Parse(db.PROPERTies
                              .OrderByDescending(p => p.PROPERTYID)
                              .Select(r => r.PROPERTYID)
                              .First().ToString());
                amnt.PROPERTYID = propertyId;
                amnt.AMOUNT = property.RENTALAMOUNT;
                amnt.DATE = DateTime.Today;

                db.RENTALAMOUNTs.Add(amnt);
                db.SaveChanges();
            }
            catch (Exception)
            {

                return null;
            }

            return true;
        }
        [HttpPut]
            [Route("UpdatePropertyDetails")]
            public dynamic PutPropertyMaster(dynamic property)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                try
                { int ID = property.PROPERTYID;
                    PROPERTY objEmp = new PROPERTY();
                    objEmp = db.PROPERTies.Where(ww=>ww.PROPERTYID==ID).FirstOrDefault();
                    if (objEmp != null)
                    {
                    string areaname = property.AREA;
                    string propertype = property.PROPERTYTYPE;
                    AREA area = db.AREAs.Where(zz => zz.AREANAME == areaname).FirstOrDefault();
                    PROPERTYTYPE type = db.PROPERTYTYPEs.Where(zz => zz.PROPERTTYPEDESCRIPTION == propertype).FirstOrDefault();
                    objEmp.AREAID = property.AREA;
                    objEmp.PROPERTYTYPEID = property.PROPERTYTYPE;
                   // objEmp.PROPERTYSTATUSID = property.PROPERTYSTATUSID;
                    ///objEmp.AGENT_ID = property.AGENT_ID;
                    objEmp.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                    objEmp.ADDRESS = property.ADDRESS;
                    objEmp.SIZE = property.SIZE;
                    objEmp.NUMBBATH = property.NUMBBATH;
                    objEmp.NUMBED = property.NUMBED;
                    objEmp.GARDEN = property.GARDEN;
                    objEmp.ADDITIONALINFO = property.ADDITIONALINFO;
                    objEmp.AVAILABLEDATE = property.AVAILABLEDATE;
                    db.SaveChanges();

                    RENTALAMOUNT amnt = new RENTALAMOUNT();

                    amnt = db.RENTALAMOUNTs.Where(qq=>qq.PROPERTYID==objEmp.PROPERTYID).FirstOrDefault();
                    
                    amnt.AMOUNT = property.RENTALAMOUNT;
                    amnt.DATE = DateTime.Today;

                    
                    db.SaveChanges();

                }
               

                }
                catch (Exception)
                {
                return null;
            }
                return Ok(property);
            }
            [HttpDelete]
            [Route("DeletePropertyDetails/{id}")]
            public IHttpActionResult DeletePropertyDelete(int id)
            {

            try
            {
                PROPERTY property = db.PROPERTies.Find(id);


                if (property == null)
                {
                    return NotFound();
                }
                else
                {
                RENTALAMOUNT amnt = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).FirstOrDefault();

                if(amnt!=null)
                {
                    db.RENTALAMOUNTs.Remove(amnt);
                    db.SaveChanges();

                }
               
                List<PROPERTYPHOTO> photos = db.PROPERTYPHOTOes.Where(jj => jj.PROPERTYID == property.PROPERTYID).ToList();

                    if(photos.Count!=0)
                    {
                        foreach (PROPERTYPHOTO photo in photos)
                        {
                            db.PROPERTYPHOTOes.Remove(photo);
                            db.SaveChanges();

                        }

                }
                else
                    {
          
                }


                db.PROPERTies.Remove(property);
                db.SaveChanges();



            }


            return Ok(property);
        }
            catch (Exception)
            {

                return null;
            }
             

            

             

            }


        [HttpGet]
        [Route("UnarchivePropertyDetails/{id}")]
        public dynamic UnarchivePropertyDetails(int id)
        {
            PROPERTY updateSTatus =new PROPERTY();
            updateSTatus = db.PROPERTies.Find(id);
            updateSTatus.PROPERTYSTATUSID = 1;
            db.SaveChanges();
            return Ok(); 



        }







        [HttpGet]
        [Route("ArchivePropertyDetails/{id}")]
        public dynamic ArchivePropertyDetails(int id)
        {
            List<dynamic> toReturn = new List<dynamic>();
            try
            {
                PROPERTY property = db.PROPERTies.Include(hh => hh.PROPERTYSTATU).Include(kk => kk.RENTALAPPLICATIONs).Include(mm => mm.BOOKINGs).Where(kk=>kk.PROPERTYID==id && (kk.PROPERTYSTATUSID==1 || kk.PROPERTYSTATUSID == 2)).FirstOrDefault();


                if (property == null)
                {
                    return NotFound();
                }
                else
                {
                    var propertyCheck = property.BOOKINGs.Where(jj => jj.PROPERTYID == property.PROPERTYID).ToList();
                    
                         var mybookings =
                 (from y in propertyCheck.AsEnumerable()
                  join x in db.EMPLOYEEDATETIMESLOTs.AsEnumerable()
                   on y.BOOKINGID equals x.BOOKINGID
                
                  select new EMPLOYEEDATETIMESLOT
                  {
                      EMPLOYEEDATETIMESLOTID = x.EMPLOYEEDATETIMESLOTID,
                    
                      DATETIMESLOTID = x.DATETIMESLOTID,
                      BOOKINGID = x.BOOKINGID

                  }).ToList();

                    List<EMPLOYEEDATETIMESLOT> list = new List<EMPLOYEEDATETIMESLOT>();
                    
                    foreach (EMPLOYEEDATETIMESLOT Jb in mybookings)
                    {
                        var Dateid = db.DATETIMESLOTs.Include(zz => zz.DATE).Where(zz => zz.DATETIMESLOTID == Jb.DATETIMESLOTID).Select(zz => zz.DATEID).FirstOrDefault();
                        var date = db.DATEs.Where(zz => zz.DATEID == Dateid).Select(zz => zz.DATEDESCRIPTION).FirstOrDefault();
                        var fulldate = Convert.ToDateTime(date + " " + DateTime.Today.Year).ToString("yyyy-MM-dd");
                        if (Convert.ToDateTime(fulldate) > DateTime.Today)
                        {
                            EMPLOYEEDATETIMESLOT newEmp = new EMPLOYEEDATETIMESLOT();
                            newEmp.BOOKINGID = Jb.BOOKINGID;
                            newEmp.EMPLOYEEDATETIMESLOTID = Jb.EMPLOYEEDATETIMESLOTID;
                            newEmp.DATETIMESLOTID = Jb.DATETIMESLOTID;

                            list.Add(newEmp);

                        }

                    }


                    if(list.Count!=0)
                    {
                        dynamic setInvalid = new ExpandoObject();
                        setInvalid.isValid = "false";
                        toReturn.Add(setInvalid);



                    }
                    else
                    {
                        var propertyCheckRentalApplication = property.RENTALAPPLICATIONs.Where(jj => jj.PROPERTYID == property.PROPERTYID &&(jj.RENTALAPPLICATIONSTATUSID==1 || jj.RENTALAPPLICATIONSTATUSID == 2)).ToList();

                        if (propertyCheckRentalApplication.Count != 0)
                        {

                            dynamic setInvalid = new ExpandoObject();
                            setInvalid.isValid = "false";
                            toReturn.Add(setInvalid);



                        }
                        else
                        {

                            var propertyCheckRentalAgreement = property.RENTAL_AGREEMENT.Where(jj => jj.PROPERTYID == property.PROPERTYID && (jj.RENTALSTATUSID == 1 || jj.RENTALSTATUSID == 3 || jj.RENTALSTATUSID == 4 || jj.RENTALSTATUSID == 5)).ToList();
                            if (propertyCheckRentalAgreement.Count != 0)
                            {
                                dynamic setInvalid = new ExpandoObject();
                                setInvalid.isValid = "false";
                                toReturn.Add(setInvalid);

                            }
                            else
                            {


                                property.PROPERTYSTATUSID = 3;
                                db.SaveChanges();
                                dynamic setInvalid = new ExpandoObject();
                                setInvalid.isValid = "true";
                                toReturn.Add(setInvalid);

                               // return true;
                            }
                        }
                        }













                            if (propertyCheck==null)
                    {

                        

                    }



                    //RENTALAMOUNT amnt = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).FirstOrDefault();

                    //if (amnt != null)
                    //{
                    //    db.RENTALAMOUNTs.Remove(amnt);
                    //    db.SaveChanges();

                    //}

                    //List<PROPERTYPHOTO> photos = db.PROPERTYPHOTOes.Where(jj => jj.PROPERTYID == property.PROPERTYID).ToList();

                    //if (photos.Count != 0)
                    //{
                    //    foreach (PROPERTYPHOTO photo in photos)
                    //    {
                    //        db.PROPERTYPHOTOes.Remove(photo);
                    //        db.SaveChanges();

                    //    }

                    //}
                    //else
                    //{

                    //}


                    //db.PROPERTies.Remove(property);
                    //db.SaveChanges();



                }


                return toReturn;
            }
            catch (Exception)
            {

                return null;
            }






        }


    }
}

