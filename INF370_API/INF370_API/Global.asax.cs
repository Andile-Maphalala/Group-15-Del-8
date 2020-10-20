using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Hangfire;

namespace INF370_API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            System.Web.Http.GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //Hangfire.GlobalConfiguration.Configuration
            //        .UseSqlServerStorage("Data Source=(LocalDb)|\\SSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-INF370_API-20200817070652.mdf;Initial Catalog=aspnet-INF370_API-20200817070652;Integrated Security=True");

        }
        protected string Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();

            // Do something with the error.
            System.Diagnostics.Debug.WriteLine(exception);

            // Redirect somewhere or return an error code in case of web api
            return "heloo";
        }
    }
}
