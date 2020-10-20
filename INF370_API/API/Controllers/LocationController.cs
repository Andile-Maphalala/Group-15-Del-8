using INF370_API.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/Location")]
    public class LocationController : ApiController
    {
        INF370Entities db = new INF370Entities();

       //City||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        
        [HttpGet]
        [Route("GetCities")]
        public IQueryable<CITY> GetCities()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.CITies;
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("GetCityDetailsById/{CityID}")]
        public IHttpActionResult GetCityDetailsById(string CityID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            CITY objEmp = new CITY();
          
            try
            {
                int ID = Convert.ToInt32(CityID);
                objEmp = db.CITies.Find(ID);
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
        [Route("InsertCityDetails")]
        public IHttpActionResult PostOwner(CITY data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.CITies.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateCityDetails")]
        public IHttpActionResult PutOwnerMaster(CITY City)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                CITY objEmp = new CITY();
                objEmp = db.CITies.Find(City.CITYID);
                if (objEmp != null)
                {
                    objEmp.CITYNAME = City.CITYNAME;
                    objEmp.PROVINCEID = City.PROVINCEID;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(City);
        }


        [HttpDelete]
        [Route("DeleteCityDetails")]
        public bool DeleteOwner(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                CITY CityDetails = db.CITies.Find(id);
                if (CityDetails == null)
                {
                    return false;
                }
                else
                {
                    var propExist = db.AREAs.Where(kk => kk.CITYID == CityDetails.CITYID).ToList();
                    if (propExist.Count == 0)
                    {
                        db.CITies.Remove(CityDetails);
                        db.SaveChanges();

                    }
                    else
                    {

                        return false;
                    }

                }

                return false;
            }
            catch (Exception)
            {

                return false;
            }
        
        }


        //Province||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        [HttpGet]
        [Route("GetProvinces")]
        public IQueryable<PROVINCE> GetProvinces()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.PROVINCEs;
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("GetProvinceDetailsById/{ProvinceID}")]
        public IHttpActionResult GetProvinceDetailsById(string ProvinceID)
        {

            db.Configuration.ProxyCreationEnabled = false;
            PROVINCE objEmp = new PROVINCE();
            
            try
            {
                int ID = Convert.ToInt32(ProvinceID);
                objEmp = db.PROVINCEs.Find(ID);
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
        [Route("InsertProvinceDetails")]
        public IHttpActionResult PostOwner(PROVINCE data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.PROVINCEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateProvinceDetails")]
        public IHttpActionResult PutOwnerMaster(PROVINCE Province)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                PROVINCE objEmp = new PROVINCE();
                objEmp = db.PROVINCEs.Find(Province.PROVINCEID);
                if (objEmp != null)
                {
                    objEmp.PROVINCENAME = Province.PROVINCENAME;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(Province);
        }


        [HttpDelete]
        [Route("DeleteProvinceDetails")]
        public bool DeleteProvince(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {

         
            PROVINCE ProvinceDetails = db.PROVINCEs.Find(id);
            if (ProvinceDetails == null)
            {
                return false;
            }
            else
            {
                var propExist = db.CITies.Where(kk => kk.PROVINCEID== ProvinceDetails.PROVINCEID).ToList();
                if (propExist.Count == 0)
                {
                    db.PROVINCEs.Remove(ProvinceDetails);
                    db.SaveChanges();
                }
                else
                {


                    return false;
                }
            }

            return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        //Area||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        [HttpGet]
        [Route("GetAreas")]
        public IQueryable<AREA> GetAreas()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.AREAs;
            }
            catch (Exception)
            {
                return null;

            }
        }

        [HttpGet]
        [Route("GetAreaDetailsById/{AreaID}")]
        public IHttpActionResult GetAreaDetailsById(string AreaID)
        {

            db.Configuration.ProxyCreationEnabled = false;
            AREA objEmp = new AREA();
            try
            {
                int ID = Convert.ToInt32(AreaID);

                objEmp = db.AREAs.Find(ID);
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
        [Route("InsertAreaDetails")]
        public IHttpActionResult PostOwner(AREA data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.AREAs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;

            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateAreaDetails")]
        public IHttpActionResult PutOwnerMaster(AREA Area)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                AREA objEmp = new AREA();
                objEmp = db.AREAs.Find(Area.AREAID);
                if (objEmp != null)
                {
                    objEmp.AREANAME = Area.AREANAME;
                    objEmp.CITYID = Area.CITYID;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                return null;

            }
            return Ok(Area);
        }


        [HttpDelete]
        [Route("DeleteAreaDetails")]
        public bool DeleteArea(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {

          
            AREA AreaDetails = db.AREAs.Find(id);
            if (AreaDetails == null)
            {
                return false;
            }
            else
            {
                var propExist= db.PROPERTies.Where(kk => kk.AREAID == AreaDetails.AREAID).ToList();
                if(propExist.Count==0)
                {
                    db.AREAs.Remove(AreaDetails);
                    db.SaveChanges();
                }
                else
                {
                    return false;

                }

            }

          

            return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
