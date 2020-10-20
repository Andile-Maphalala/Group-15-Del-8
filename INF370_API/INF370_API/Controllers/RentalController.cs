using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web.Http.Cors;
using System.Data.Entity;
using System.Data;
using System.Dynamic;
using System.IO;
using System.Drawing;
using System.Web;
using System.Drawing.Imaging;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Rental")]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]

    public class RentalController : ApiController
    {
        INF370Entities db = new INF370Entities();

        //[HttpGet]
        //[Route("getPropertyByProvince/{Province}")]
        //public IHttpActionResult GetEmployeeTypeById(string Province)
        //{

        //    db.Configuration.ProxyCreationEnabled = false;

        //    EMPLOYEETYPE objEmp = new EMPLOYEETYPE();
        //    int ID = Convert.ToInt32(Province);
        //    try
        //    {
        //        objEmp = db.EMPLOYEETYPEs.Find(ID);
        //        if (objEmp == null)
        //        {
        //            return NotFound();
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return Ok(objEmp);
        //}

        //[HttpGet]
        //[Route("getPropertyByProvince/{Province}")]
        //public dynamic getPropertyByProvinceID(string Province)
        //{


        //}


        List<PROPERTY> properties = new List<PROPERTY>();
        List<PROPERTY> propertieswithAmount = new List<PROPERTY>();
    //    [Route("getPropertyByProvince")]
    //    [HttpPost]
    //    public List<dynamic> getPropertyByProvince(searchProperty Province)
    //    {
    //        var province = db.PROVINCEs.Where(xx => xx.PROVINCENAME == Province.searchValue).FirstOrDefault();



    //        if (province != null)
    //        {
    //            var city = db.CITies.Where(xx => xx.PROVINCEID == province.PROVINCEID).ToList();
    //            var area = (from pd in city
    //                        join od in db.AREAs on pd.CITYID equals od.CITYID

    //                        select new
    //                        {
    //                            od
    //                        }).ToList();

    //            var properties =
    //                (from x in db.PROPERTies.AsEnumerable()
    //                 join y in area.AsEnumerable()
    //on x.AREAID equals y.od.AREAID
    //              //  where x.id.Equals(id)
    //              select new
    //                 {
    //                     x
    //                 }).ToList();


    //            var typeId = db.PROPERTYTYPEs.Where(nn => nn.PROPERTTYPEDESCRIPTION == Province.type).Select(hh => hh.PROPERTYTYPEID).FirstOrDefault();

    //            var filterProperties = properties.Where(ww => ww.x.PROPERTYTYPEID == typeId && ww.x.PROPERTYSTATUSID == 1).ToList();

    //            if (Province.amount == 7000)
    //            {
    //                propertieswithAmount =
    //           (from x in filterProperties.AsEnumerable()
    //            join y in db.RENTALAMOUNTs.AsEnumerable()
    //            on x.x.PROPERTYID equals y.PROPERTYID
    //            where y.AMOUNT > 7000
    //            select new PROPERTY
    //            {
    //                PROPERTYID = x.x.PROPERTYID,
    //                ADDITIONALINFO = x.x.ADDITIONALINFO,
    //                PROPERTYDESCRIPTION = x.x.PROPERTYDESCRIPTION,
    //                ADDRESS = x.x.ADDRESS,
    //                NUMBED = x.x.NUMBED,
    //                PROPERTYTYPEID = x.x.PROPERTYTYPEID,
    //                AREAID = x.x.AREAID,


    //            }).ToList();

    //            }

    //            else
    //            {
    //                propertieswithAmount =
    //          (from x in filterProperties.AsEnumerable()
    //           join y in db.RENTALAMOUNTs.AsEnumerable()
    //           on x.x.PROPERTYID equals y.PROPERTYID
    //           where y.AMOUNT >= Province.amount && y.AMOUNT <= (Province.amount + 999)
    //           select new PROPERTY
    //           {
    //               PROPERTYID = x.x.PROPERTYID,
    //               ADDITIONALINFO = x.x.ADDITIONALINFO,
    //               PROPERTYDESCRIPTION = x.x.PROPERTYDESCRIPTION,
    //               ADDRESS = x.x.ADDRESS,
    //               NUMBED = x.x.NUMBED,
    //               PROPERTYTYPEID = x.x.PROPERTYTYPEID,
    //               AREAID = x.x.AREAID,




    //           }).ToList();

    //            }

    //            //db.PROPERTies.Join(area, x => x.AREAID, s => s.od.AREAID, ((x, s) => new )).ToList();




    //            //(from pd in area
    //            // join od in db.PROPERTies on pd.od.AREAID equals od.AREAID

    //            // select new
    //            // {
    //            //     od
    //            // }).ToList();
    //            //    properties = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID).ToList();

    //            // properties = db.PROPERTies.Any(aa=>aa.AREAID==area.).ToList();

    //            // var results = db.PROPERTies.Where(r => area.Contains(r.AREAID));

    //        }



    //        List<dynamic> toReturn = new List<dynamic>();
    //        foreach (PROPERTY property in propertieswithAmount)
    //        {



    //            dynamic dynamicProperty = new ExpandoObject();

    //            dynamicProperty.PROPERTYID = property.PROPERTYID;
    //            dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
    //            dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
    //            dynamicProperty.ADDRESS = property.ADDRESS;
    //            dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
    //            dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
    //            dynamicProperty.NUMBED = property.NUMBED;
    //            var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

    //            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
    //            try
    //            {
    //                using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }
    //            }
    //            catch
    //            {
    //                string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

    //                using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }

    //            }





    //            toReturn.Add(dynamicProperty);

    //        }
    //        if (propertieswithAmount.Count == 0)
    //        {
    //            dynamic setInvalid = new ExpandoObject();
    //            setInvalid.isValid = "false";
    //            toReturn.Add(setInvalid);

    //        }

    //        return toReturn;





    //    }

    //    //[HttpGet]
    //    //[Route("getPropertyByProvince/{Province}")]
    //    //public IHttpActionResult getPropertyByProvinceID(string Province)
    //    //{

    //    //    db.Configuration.ProxyCreationEnabled = false;

    //    //    List<PROPERTY> objEmp = new List<PROPERTY>();

    //    //    var province = db.PROVINCEs.Where(xx => xx.PROVINCENAME == Province).FirstOrDefault();
    //    //    var city = db.CITies.Where(xx => xx.PROVINCEID == province.PROVINCEID).ToList();          
    //    //    var area = (from pd in city
    //    //             join od in db.AREAs on pd.CITYID equals od.CITYID

    //    //             select new
    //    //             {od.AREAID
    //    //             }).FirstOrDefault();

    //    //    try
    //    //    {
    //    //        objEmp =db.PROPERTies.Include(cc=>cc.AREA).Where(vv=>vv.AREAID== area.AREAID).ToList();
    //    //        if (objEmp == null||objEmp.Count()==0)
    //    //        {
    //    //            return NotFound();
    //    //        }

    //    //    }
    //    //    catch (Exception)
    //    //    {
    //    //        throw;
    //    //    }

    //    //    return Ok(objEmp);
    //    //}


    //    [HttpPost]
    //    [Route("getPropertyByCity")]
    //    public List<dynamic> getPropertyByCity(searchProperty City)
    //    {

    //        db.Configuration.ProxyCreationEnabled = false;

    //        List<PROPERTY> objEmp = new List<PROPERTY>();


    //        var city = db.CITies.Where(xx => xx.CITYNAME == City.searchValue).ToList();
    //        if (city != null)
    //        {
    //            var area = (from pd in city
    //                        join od in db.AREAs on pd.CITYID equals od.CITYID

    //                        select new
    //                        {
    //                            od
    //                        }).ToList();


    //            properties =
    //               (from x in db.PROPERTies.AsEnumerable()
    //                join y in area.AsEnumerable()
    //on x.AREAID equals y.od.AREAID
    //                //  where x.id.Equals(id)
    //                select new PROPERTY
    //                {
    //                    PROPERTYID = x.PROPERTYID,
    //                    ADDITIONALINFO = x.ADDITIONALINFO,
    //                    PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
    //                    ADDRESS = x.ADDRESS,
    //                    NUMBED = x.NUMBED,
    //                    PROPERTYTYPEID = x.PROPERTYTYPEID,
    //                    AREAID = x.AREAID,

    //                }).ToList();

    //            var typeId = db.PROPERTYTYPEs.Where(nn => nn.PROPERTTYPEDESCRIPTION == City.type).Select(hh => hh.PROPERTYTYPEID).FirstOrDefault();

    //            var filterProperties = properties.Where(ww => ww.PROPERTYTYPEID == typeId && ww.PROPERTYSTATUSID == 1).ToList();

    //            if (City.amount == 7000)
    //            {
    //                propertieswithAmount =
    //           (from x in filterProperties.AsEnumerable()
    //            join y in db.RENTALAMOUNTs.AsEnumerable()
    //            on x.PROPERTYID equals y.PROPERTYID
    //            where y.AMOUNT > 7000
    //            select new PROPERTY
    //            {
    //                PROPERTYID = x.PROPERTYID,
    //                ADDITIONALINFO = x.ADDITIONALINFO,
    //                PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
    //                ADDRESS = x.ADDRESS,
    //                NUMBED = x.NUMBED,
    //                PROPERTYTYPEID = x.PROPERTYTYPEID,
    //                AREAID = x.AREAID,
    //            }).ToList();

    //            }

    //            else
    //            {
    //                propertieswithAmount =
    //          (from x in filterProperties.AsEnumerable()
    //           join y in db.RENTALAMOUNTs.AsEnumerable()
    //           on x.PROPERTYID equals y.PROPERTYID
    //           where y.AMOUNT >= City.amount && y.AMOUNT <= (City.amount + 999)
    //           select new PROPERTY
    //           {
    //               PROPERTYID = x.PROPERTYID,
    //               ADDITIONALINFO = x.ADDITIONALINFO,
    //               PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
    //               ADDRESS = x.ADDRESS,
    //               NUMBED = x.NUMBED,
    //               PROPERTYTYPEID = x.PROPERTYTYPEID,
    //               AREAID = x.AREAID,

    //           }).ToList();

    //            }

    //        }
    //        //objEmp = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID).ToList();
    //        //    if (objEmp == null)
    //        //    {
    //        //        return NotFound();
    //        //    }

    //        //}
    //        //catch (Exception)
    //        //{
    //        //    throw;
    //        //}

    //        //return Ok(objEmp);



    //        List<dynamic> toReturn = new List<dynamic>();
    //        foreach (PROPERTY property in propertieswithAmount)
    //        {
    //            dynamic dynamicProperty = new ExpandoObject();

    //            dynamicProperty.PROPERTYID = property.PROPERTYID;
    //            dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
    //            dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
    //            dynamicProperty.ADDRESS = property.ADDRESS;
    //            dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
    //            dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
    //            dynamicProperty.NUMBED = property.NUMBED;
    //            var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

    //            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
    //            try
    //            {
    //                using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }
    //            }
    //            catch
    //            {
    //                string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

    //                using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }

    //            }





    //            toReturn.Add(dynamicProperty);
    //        }
    //        if (propertieswithAmount.Count == 0)
    //        {
    //            dynamic setInvalid = new ExpandoObject();
    //            setInvalid.isValid = "false";
    //            toReturn.Add(setInvalid);
    //        }
    //        return toReturn;

    //    }


    //    [HttpPost]
    //    [Route("getPropertyByArea")]
    //    public List<dynamic> getPropertyByArea(searchProperty Area)
    //    {

    //        db.Configuration.ProxyCreationEnabled = false;

    //        List<PROPERTY> objEmp = new List<PROPERTY>();
    //        //change search to lowercase then first letter to uppercase



    //        var area = db.AREAs.Where(xx => xx.AREANAME == Area.searchValue).FirstOrDefault();
    //        if (area != null)
    //        {

    //            properties = db.PROPERTies.Include(cc => cc.AREA).Where(vv => vv.AREAID == area.AREAID && vv.PROPERTYSTATUSID == 1).ToList();

    //            var typeId = db.PROPERTYTYPEs.Where(nn => nn.PROPERTTYPEDESCRIPTION == Area.type).Select(hh => hh.PROPERTYTYPEID).FirstOrDefault();

    //            var filterProperties = properties.Where(ww => ww.PROPERTYTYPEID == typeId && ww.PROPERTYSTATUSID == 1).ToList();

    //            if (Area.amount == 7000)
    //            {
    //                propertieswithAmount =
    //           (from x in filterProperties.AsEnumerable()
    //            join y in db.RENTALAMOUNTs.AsEnumerable()
    //            on x.PROPERTYID equals y.PROPERTYID
    //            where y.AMOUNT > 7000
    //            select new PROPERTY
    //            {

    //                PROPERTYID = x.PROPERTYID,
    //                ADDITIONALINFO = x.ADDITIONALINFO,
    //                PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
    //                ADDRESS = x.ADDRESS,
    //                NUMBED = x.NUMBED,
    //                PROPERTYTYPEID = x.PROPERTYTYPEID,
    //                AREAID = x.AREAID,


    //            }).ToList();

    //            }

    //            else
    //            {
    //                propertieswithAmount =
    //          (from x in filterProperties.AsEnumerable()
    //           join y in db.RENTALAMOUNTs.AsEnumerable()
    //           on x.PROPERTYID equals y.PROPERTYID
    //           where y.AMOUNT >= Area.amount && y.AMOUNT <= (Area.amount + 999)
    //           select new PROPERTY
    //           {

    //               PROPERTYID = x.PROPERTYID,
    //               ADDITIONALINFO = x.ADDITIONALINFO,
    //               PROPERTYDESCRIPTION = x.PROPERTYDESCRIPTION,
    //               ADDRESS = x.ADDRESS,
    //               NUMBED = x.NUMBED,
    //               PROPERTYTYPEID = x.PROPERTYTYPEID,
    //               AREAID = x.AREAID,
    //           }).ToList();

    //            }



    //        }

    //        List<dynamic> toReturn = new List<dynamic>();
    //        foreach (PROPERTY property in propertieswithAmount)
    //        {
    //            dynamic dynamicProperty = new ExpandoObject();

    //            dynamicProperty.PROPERTYID = property.PROPERTYID;
    //            dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
    //            dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
    //            dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
    //            dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
    //            dynamicProperty.NUMBED = property.NUMBED;
    //            dynamicProperty.ADDRESS = property.ADDRESS;
    //            var photo = db.PROPERTYPHOTOes.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(jj => jj.PHOTO).FirstOrDefault();

    //            string filePath = HttpContext.Current.Server.MapPath("~/Images/" + photo);
    //            try
    //            {
    //                using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }
    //            }
    //            catch
    //            {
    //                string filePat = HttpContext.Current.Server.MapPath("~/Images/notfound.png");

    //                using (FileStream fileStream = new FileStream(filePat, FileMode.Open))
    //                {
    //                    using (var memoryStream = new MemoryStream())
    //                    {
    //                        fileStream.CopyTo(memoryStream);
    //                        Bitmap image = new Bitmap(1, 1);
    //                        image.Save(memoryStream, ImageFormat.Png);

    //                        byte[] byteImage = memoryStream.ToArray();
    //                        string base64String = Convert.ToBase64String(byteImage);
    //                        dynamicProperty.PHOTO = "data:image/png;base64," + base64String;
    //                    }
    //                }

    //            }





    //            toReturn.Add(dynamicProperty);
    //        }
    //        if (propertieswithAmount.Count == 0)
    //        {
    //            dynamic setInvalid = new ExpandoObject();
    //            setInvalid.isValid = "false";
    //            toReturn.Add(setInvalid);
    //        }







    //        return toReturn;




    //    }

    //    //[HttpGet]
    //    //[Route("getPropertyByType/{Type}")]
    //    //public dynamic getPropertyByType(string Type)
    //    //{

    //    //    db.Configuration.ProxyCreationEnabled = false;
    //    //    List<PROPERTY> objEmp = new List<PROPERTY>();

    //    //    var typeId = db.PROPERTYTYPEs.Where(nn => nn.PROPERTTYPEDESCRIPTION == Type).Select(hh=>hh.PROPERTYTYPEID).FirstOrDefault();

    //    //    try
    //    //    {
    //    //        objEmp = db.PROPERTies.Where(gg=>gg.PROPERTYTYPEID==typeId).ToList();


    //    //        //objEmp = db.PROPERTies.Where(vv => vv.PROPERTYID ==Reference).ToList();
    //    //        if (objEmp == null)
    //    //        {
    //    //            dynamic setInvalid = new ExpandoObject();
    //    //            setInvalid.isValid = "false";
    //    //            return setInvalid;
    //    //        }

    //    //    }
    //    //    catch (Exception)
    //    //    {
    //    //        dynamic User = new ExpandoObject();
    //    //        User.Message = "Something went wrong !";
    //    //        return User;
    //    //    }

    //    //    return Ok(objEmp);
    //    //}
        [HttpGet]
        [Route("getPropertyByReference/{Reference}")]
        public dynamic getPropertyByReference(int Reference)
        {
            db.Configuration.ProxyCreationEnabled = false;

            PROPERTY property = new PROPERTY();
            try
            {




                property = db.PROPERTies.Where(kk => kk.PROPERTYID == Reference &&kk.IsExtending==false ).FirstOrDefault();

                if (property == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    return setInvalid;
                }
                else
                {
                    dynamic dynamicProperty = new ExpandoObject();

                    dynamicProperty.PROPERTYID = property.PROPERTYID;
                    dynamicProperty.AMOUNT = db.RENTALAMOUNTs.Where(hh => hh.PROPERTYID == property.PROPERTYID).Select(hh => hh.AMOUNT);
                    dynamicProperty.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
                    dynamicProperty.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
                    dynamicProperty.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
                    dynamicProperty.NUMBED = property.NUMBED;
                    dynamicProperty.AVAILABLEDATE =Convert.ToDateTime( property.AVAILABLEDATE).AddDays(5);

                    dynamicProperty.ADDRESS = property.ADDRESS;
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



                    return dynamicProperty;

                }
            }
            catch (Exception)
            {

                return null;
            }
        }






        [HttpGet]
        [Route("getPropertyByReference1/{Reference}")]
        public dynamic getPropertyByReference1(int Reference)
        {
            List<dynamic> dynamicPhotos = new List<dynamic>();
            INF370Entities db = new INF370Entities();

            PROPERTY property = db.PROPERTies.Where(kk => kk.PROPERTYID == Reference ).FirstOrDefault();
            dynamic objEmp = new ExpandoObject();
            //objEmp.Property = forbros;
            objEmp.PROPERTYID = property.PROPERTYID;
            objEmp.PROPERTYSTATUSID = property.PROPERTYSTATUSID;
            objEmp.PROPERTYTYPEID = db.PROPERTYTYPEs.Where(vvs => vvs.PROPERTYTYPEID == property.PROPERTYTYPEID).Select(jj => jj.PROPERTTYPEDESCRIPTION).FirstOrDefault();
            ;
            objEmp.AGENT_ID = property.AGENT_ID;
            objEmp.PROPERTYDESCRIPTION = property.PROPERTYDESCRIPTION;
            objEmp.AREAID = db.AREAs.Where(vvs => vvs.AREAID == property.AREAID).Select(jj => jj.AREANAME).FirstOrDefault();
            objEmp.ADDRESS = property.ADDRESS;
            objEmp.SIZE = property.SIZE;
            objEmp.NUMBBATH = property.NUMBBATH;
            objEmp.NUMBED = property.NUMBED;
            objEmp.GARDEN = property.GARDEN;
            objEmp.ADDITIONALINFO = property.ADDITIONALINFO;
            objEmp.AVAILABLEDATE = Convert.ToDateTime(property.AVAILABLEDATE).AddDays(5);
            objEmp.LISTINGDATE = property.LISTINGDATE;
            var amnt = db.RENTALAMOUNTs.Where(jj => jj.PROPERTYID == property.PROPERTYID).FirstOrDefault();
            objEmp.RentalAmount = amnt.AMOUNT;
            List<PROPERTYPHOTO> photos = db.PROPERTYPHOTOes.Where(gg => gg.PROPERTYID == property.PROPERTYID).ToList();

            if (photos.Count == 0)
            {
                dynamic dynamicPic = new ExpandoObject();

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
                        dynamicPic.PHOTO = "data:image/png;base64," + base64String;
                    }
                }






                dynamicPhotos.Add(dynamicPic);

            }
            else
            {
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
                                dynamicPic.PHOTO = "data:image/png;base64," + base64String;
                            }
                        }
                    }





                    dynamicPhotos.Add(dynamicPic);

                }

            }


            objEmp.photo = dynamicPhotos;



            return objEmp;

        }

















        [HttpGet]
        [Route("getPropertyByReferen/{Reference}")]
        public dynamic getPropertyBy(int Reference)
        {

            db.Configuration.ProxyCreationEnabled = false;

            PROPERTY objEmp = new PROPERTY();


            //var area = db.AREAs.Where(xx => xx.AREANAME == Reference).FirstOrDefault();

            try
            {
                objEmp = db.PROPERTies.Find(Reference);


                //objEmp = db.PROPERTies.Where(vv => vv.PROPERTYID ==Reference).ToList();
                if (objEmp == null)
                {
                    dynamic setInvalid = new ExpandoObject();
                    setInvalid.isValid = "false";
                    return setInvalid;
                }

            }
            catch (Exception)
            {
                return null;

            }

            return Ok(objEmp);
        }

    }
}
