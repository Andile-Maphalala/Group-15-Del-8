using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Hangfire.Dashboard;

[assembly: OwinStartup(typeof(INF370_API.Startup))]

namespace INF370_API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            INF370_API.Models.Hangfire.ConfigureHangfire(app);
            INF370_API.Models.Hangfire.InitializeJobs();

        }
        public class MyAuthorizationFilter : IDashboardAuthorizationFilter
        {
            public bool Authorize(DashboardContext context)
            {
                // In case you need an OWIN context, use the next line, `OwinContext` class
                // is the part of the `Microsoft.Owin` package.
                var owinContext = new OwinContext(context.GetOwinEnvironment());

                // Allow all authenticated users to see the Dashboard (potentially dangerous).
                return owinContext.Authentication.User.Identity.IsAuthenticated;
            }
        }
    }
}
