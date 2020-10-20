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
using System.Data.Entity;



namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Test")]
    public class TestController : ApiController
    {
        INF370Entities db = new INF370Entities();
        [Route("Test")]
        [HttpGet]
        public List<dynamic> Test()
        {

            INF370Entities db = new INF370Entities();
           var list = db.RENTAL_AGREEMENT.Include(zz => zz.CLIENT).ToList();
            var final = new List<dynamic>();
            foreach (var date in list)
            {
                var end = Convert.ToDateTime(date.RENTALENDDATE).AddMonths(-2);

                if (end <= DateTime.Now)
                {
                    dynamic d = new ExpandoObject();
                    d.end = date.RENTALENDDATE;

                    final.Add(d);

                }


            }

            return final;
        }

        [Route("GetTypes")]
        [HttpGet]
        public List<dynamic> GetTypes()
        {
            var PROPERTYTYPEs = db.PROPERTYTYPEs.ToList();

            List<dynamic> toReturn = new List<dynamic>();

            dynamic dynamicPropertyAny = new ExpandoObject();
            dynamicPropertyAny.ID ="";
            dynamicPropertyAny.Name = "Any";
            toReturn.Add(dynamicPropertyAny);

            foreach (PROPERTYTYPE city in PROPERTYTYPEs)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.PROPERTYTYPEID;
                dynamicProperty.Name = city.PROPERTTYPEDESCRIPTION;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("GetCities/{ID}")]
        [HttpGet]
        public List<dynamic> GetCities(int ID)
        {
            var cities = db.CITies.Where(kk=>kk.PROVINCEID==ID).ToList();
     
            List<dynamic> toReturn = new List<dynamic>();
            dynamic dynamicPropertyAny = new ExpandoObject();
            dynamicPropertyAny.ID = "";
            dynamicPropertyAny.Name = "All";
            toReturn.Add(dynamicPropertyAny);
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
            var areas = db.AREAs.Where(hh=>hh.CITYID==ID).ToList();

            List<dynamic> toReturn = new List<dynamic>();
            dynamic dynamicPropertyAny = new ExpandoObject();
            dynamicPropertyAny.ID = "";
            dynamicPropertyAny.Name = "All";
            toReturn.Add(dynamicPropertyAny);
            foreach (AREA city in areas)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.AREAID;
                dynamicProperty.Name = city.AREANAME ;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("GetProvinces")]
        [HttpGet]
        public List<dynamic> GetProvinces()
        {
            var provinces = db.PROVINCEs.ToList();

            List<dynamic> toReturn = new List<dynamic>();

            foreach (PROVINCE city in provinces)
            {

                dynamic dynamicProperty = new ExpandoObject();

                dynamicProperty.ID = city.PROVINCEID;
                dynamicProperty.Name = city.PROVINCENAME;
                toReturn.Add(dynamicProperty);

            }

            return toReturn;




        }

        [Route("getPropertyByCity")]
        [HttpPost]
        public List<dynamic> getPropertyByCity(searchProperty Province)
        {
            Boolean flag = false;
            var properties = db.PROPERTies.ToList();
            List<dynamic> toReturn = new List<dynamic>();


         
            if (Province.type == "" || Province.type == null)
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.type);
                properties = properties.Where(ff => ff.PROPERTYTYPEID == id).ToList();

            }

            if (Province.minbed ==0)
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.minbed);
                properties = properties.Where(ff => ff.NUMBED >= id).ToList();

            }

            if (Province.maxamount == 0)
            {
                flag = true;

            }
            else
            {



                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT <= Province.maxamount
                              select x).ToList();



            }
            if (Province.minamount == 0)
            {
                flag = true;

            }
            else
            {
                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT >= Province.minamount
                              select x).ToList();



            }
            if (Province.searchValue == null)
            {
                flag = true;

            }
            else
            {

                int? id = Convert.ToInt32(Province.searchValue);
                var city = db.CITies.Find(id);

                if (city == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    toReturn.Add(setInvalid);

                }
                else
                {
                    var area = db.AREAs.Where(jj => jj.CITYID == city.CITYID).ToList();


                    var finalproperty = (from x in properties.AsEnumerable()
                                         join y in area.AsEnumerable()
                           on x.AREAID equals y.AREAID
                           where (x.PROPERTYSTATUSID==1 && x.IsExtending == false) || (x.PROPERTYSTATUSID == 2 && x.IsExtending == false)
                                         select new PROPERTY
                                         {
                                             PROPERTYID = x.PROPERTYID,
                                             ADDITIONALINFO = x.ADDITIONALINFO,
                                             PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
                                             ADDRESS = x.ADDRESS,
                                             NUMBED = x.NUMBED,
                                             PROPERTYTYPEID = x.PROPERTYTYPEID,
                                             AREAID = x.AREAID,
                                             AVAILABLEDATE = x.AVAILABLEDATE,


                                         }).ToList();






                    foreach (PROPERTY property in finalproperty)
                    {



                        dynamic dynamicProperty = new ExpandoObject();

                        dynamicProperty.PROPERTYID = property.PROPERTYID;
                        dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
                        dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                        dynamicProperty.ADDRESS = property.ADDRESS;
                        dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
                        dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
                        dynamicProperty.NUMBED = property.NUMBED;

                        dynamicProperty.AVAILABLEDATE =Convert.ToDateTime( property.AVAILABLEDATE).AddDays(5);

                        var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

                        string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
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
                                    dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                                }
                            }
                        }
                        catch
                        {
                            string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

                            using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                                }
                            }

                        }





                        toReturn.Add(dynamicProperty);

                    }

                    if (finalproperty.Count == 0)
                    {
                        dynamic setInvalid = new ExpandoObject();
                        setInvalid.isValid = "false";
                        toReturn.Add(setInvalid);

                    }




                }
            }


            return toReturn;


        }











        [Route("getPropertyByArea")]
        [HttpPost]
        public List<dynamic> getPropertyByArea(searchProperty Province)
        {
            Boolean flag = false;
          var properties = db.PROPERTies.ToList();
            List<dynamic> toReturn = new List<dynamic>();


          
            if (Province.type == "" || Province.type == null)
            {
                flag = true;

            }
            else
            { int? id = Convert.ToInt32(Province.type);
                properties = properties.Where(ff => ff.PROPERTYTYPEID == id).ToList();

            }
            if (Province.minbed == 0)
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.minbed);
                properties = properties.Where(ff => ff.NUMBED >= id).ToList();

            }

            if (Province.maxamount==0)
            {
                flag = true;

            }
            else
            {



                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT <= Province.maxamount
                              select x).ToList() ;



            }
            if (Province.minamount == 0)
            {
                flag = true;

            }
            else
            {
                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT >= Province.minamount
                              select x).ToList();



            }
            if (Province.searchValue == null)
            {
                flag = true;

            }
            else
            {
           
                int? id = Convert.ToInt32(Province.searchValue);
                var area = db.AREAs.Find(id);

                if (area== null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.
                        alid = "false";
                    toReturn.Add(setInvalid);

                }
                else { 

                var finalproperty = properties.Where(kk => kk.AREAID == area.AREAID &&  (kk.PROPERTYSTATUSID == 1 &&kk.IsExtending==false|| kk.PROPERTYSTATUSID == 2 && kk.IsExtending == false)).ToList();

                foreach (PROPERTY property in finalproperty)
                {



                    dynamic dynamicProperty = new ExpandoObject();

                    dynamicProperty.PROPERTYID = property.PROPERTYID;
                    dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
                    dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                    dynamicProperty.ADDRESS = property.ADDRESS;
                    dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
                    dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
                    dynamicProperty.NUMBED = property.NUMBED;
                        dynamicProperty.AVAILABLEDATE = Convert.ToDateTime(property.AVAILABLEDATE).AddDays(5);

                        var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

                    string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
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
                                dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                            }
                        }
                    }
                    catch
                    {
                        string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

                        using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                fileStream.CopyTo(memoryStream);
                                Bitmap image = new Bitmap(1, 1);
                                image.Save(memoryStream, ImageFormat.Png);

                                byte[] byteImage = memoryStream.ToArray();
                                string base64String = Convert.ToBase64String(byteImage);
                                dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                            }
                        }

                    }





                    toReturn.Add(dynamicProperty);

                }

                if (finalproperty.Count == 0)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    toReturn.Add(setInvalid);

                }




                }
            }


            return toReturn;


        }


        [Route("getPropertyByProvince")]
        
        
        [HttpPost]
        public List<dynamic> getPropertyByProvince(searchProperty Province)
        {
            Boolean flag = false;
            var properties = db.PROPERTies.ToList();
            List<dynamic> toReturn = new List<dynamic>();


            if (Province.type == ""||Province.type ==null  )
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.type);
                properties = properties.Where(ff => ff.PROPERTYTYPEID == id).ToList();

            }
            if (Province.minbed == 0)
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.minbed);
                properties = properties.Where(ff => ff.NUMBED >= id).ToList();

            }


            if (Province.maxamount == 0)
            {
                flag = true;

            }
            else
            {



                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT <= Province.maxamount
                              select x).ToList();



            }
            if (Province.minamount == 0)
            {
                flag = true;

            }
            else
            {
                properties = (from x in properties.AsEnumerable()
                              join y in db.RENTALAMOUNTs.AsEnumerable()
                              on x.PROPERTYID equals y.PROPERTYID
                              where y.AMOUNT >= Province.minamount
                              select x).ToList();



            }
            if (Province.searchValue == null)
            {
                flag = true;

            }
            else
            {
                int? id = Convert.ToInt32(Province.searchValue);
                var city = db.CITies.Where(xx => xx.PROVINCEID == id).ToList();
                if (city == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    toReturn.Add(setInvalid);

                }
                else
                {


                    var area = (from pd in city
                                join od in db.AREAs on pd.CITYID equals od.CITYID

                                select new
                                {
                                    od
                                }).ToList();


                    var finalproperty = (from x in properties.AsEnumerable()
                                         join y in area.AsEnumerable()
                           on x.AREAID equals y.od.AREAID
                                         where (x.PROPERTYSTATUSID == 1 && x.IsExtending == false )|| (x.PROPERTYSTATUSID == 2 && x.IsExtending == false)

                                         select new PROPERTY
                                         {
                                             PROPERTYID = x.PROPERTYID,
                                             ADDITIONALINFO = x.ADDITIONALINFO,
                                             PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
                                             ADDRESS = x.ADDRESS,
                                             NUMBED = x.NUMBED,
                                             PROPERTYTYPEID = x.PROPERTYTYPEID,
                                             AREAID = x.AREAID,
                                             AVAILABLEDATE = x.AVAILABLEDATE,

                                         }).ToList();
                    foreach (PROPERTY property in finalproperty)
                    {



                        dynamic dynamicProperty = new ExpandoObject();

                        dynamicProperty.PROPERTYID = property.PROPERTYID;
                        dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
                        dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                        dynamicProperty.ADDRESS = property.ADDRESS;
                        dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
                        dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
                        dynamicProperty.NUMBED = property.NUMBED;
                        dynamicProperty.AVAILABLEDATE = Convert.ToDateTime(property.AVAILABLEDATE).AddDays(5);

                        var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

                        string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
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
                                    dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                                }
                            }
                        }
                        catch
                        {
                            string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

                            using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    fileStream.CopyTo(memoryStream);
                                    Bitmap image = new Bitmap(1, 1);
                                    image.Save(memoryStream, ImageFormat.Png);

                                    byte[] byteImage = memoryStream.ToArray();
                                    string base64String = Convert.ToBase64String(byteImage);
                                    dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
                                }
                            }

                        }





                        toReturn.Add(dynamicProperty);

                    }

                    if (finalproperty.Count == 0)
                    {
                        dynamic setInvalid = new ExpandoObject();
                        setInvalid.isValid = "false";
                        toReturn.Add(setInvalid);

                    }

                }



            }


            return toReturn;


        }


























    }
}
