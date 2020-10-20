using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using INF370_API.Models;
using System.Dynamic;

namespace INF370_API.Controllers
{
    [RoutePrefix("Api/ViewFeedback")]
    public class ViewFeedbackController : ApiController
    {

        INF370Entities db = new INF370Entities();

        [HttpGet]
        [Route("GetFeedbackComments")]
        public IQueryable<FEEDBACK> GetFeedbackComments()
        {
            INF370Entities db = new INF370Entities();
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                return db.FEEDBACKs;
            }
            catch (Exception)
            {
                return null;

            }
        }
    }
}
