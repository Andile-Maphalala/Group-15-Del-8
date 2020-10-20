
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Web.Http.Cors;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/PropertyType")]
    //[EnableCors(origins: "", headers: "", methods: "*")]
    public class PropertyTypeController : ApiController
    {

        INF370Entities db = new INF370Entities();

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
        [Route("GetPropertyTypeDetailsById/{PropertyTypeID}")]
        public IHttpActionResult GetPropertyTypeById(string PropertyTypeID)
        {

            db.Configuration.ProxyCreationEnabled = false;

            PROPERTYTYPE objEmp = new PROPERTYTYPE();

            try
            {
                int ID = Convert.ToInt32(PropertyTypeID);
                objEmp = db.PROPERTYTYPEs.Find(ID);
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
        [Route("InsertPropertyTypeDetails")]
        public IHttpActionResult PostOwner(PROPERTYTYPE data)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

        
            try
            {
                db.PROPERTYTYPEs.Add(data);
                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }



            return Ok(data);
        }


        [HttpPut]
        [Route("UpdatePropertyTypeDetails")]
        public IHttpActionResult PutOwnerMaster(PROPERTYTYPE PropertyType)
        {

            db.Configuration.ProxyCreationEnabled = false;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                PROPERTYTYPE objEmp = new PROPERTYTYPE();
                objEmp = db.PROPERTYTYPEs.Find(PropertyType.PROPERTYTYPEID);
                if (objEmp != null)
                {
                    objEmp.PROPERTTYPEDESCRIPTION = PropertyType.PROPERTTYPEDESCRIPTION;
                    //objEmp.TIMESVISITED = PropertyType.TIMESVISITED;



                }
                int i = this.db.SaveChanges();

            }
            catch (Exception)
            {
                return null;
            }
            return Ok(PropertyType);
        }


        [HttpDelete]
        [Route("DeletePropertyTypeDetails")]
        public IHttpActionResult DeleteOwner(int id)
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {


                PROPERTYTYPE propertyTypeDetails = db.PROPERTYTYPEs.Find(id);
                if (propertyTypeDetails == null)
                {
                    return NotFound();
                }

                db.PROPERTYTYPEs.Remove(propertyTypeDetails);
                db.SaveChanges();

                return Ok(propertyTypeDetails);
            }

            catch (Exception)
            {

                return null;
            }

        }
    }
}