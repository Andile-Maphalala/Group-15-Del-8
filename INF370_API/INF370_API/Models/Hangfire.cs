using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hangfire;
using Owin;
using Microsoft.Extensions.DependencyInjection;
using Hangfire.Server;
using Hangfire.Dashboard;

namespace INF370_API.Models
{
   

   
        public class Hangfire
        {
            public static void ConfigureHangfire(IAppBuilder app)
            {
                GlobalConfiguration.Configuration
                    .UseSqlServerStorage("Data Source=INF370.database.windows.net;Initial Catalog=INF370;Persist Security Info=True;User ID=AccessDb370;Password=IQsolutions3;MultipleActiveResultSets=True;Application Name=EntityFramework");
            var options =  new DashboardOptions
            {
                AuthorizationFilters = Enumerable.Empty<IAuthorizationFilter>(),
                AppPath = "https://inturbidusbackend.azurewebsites.net"
            };

            app.UseHangfireDashboard("/jobs",options);
                app.UseHangfireServer();
            }

            public static void InitializeJobs()
            {
            RecurringJob.AddOrUpdate<SendPaymentReminder>(job => job.Execute(),Cron.Monthly(25,12));
            RecurringJob.AddOrUpdate<SendLeaseReminder>(job => job.Execute(), Cron.Daily(12));
            RecurringJob.AddOrUpdate<testReminder>(job => job.Execute(), Cron.Daily(15));
            RecurringJob.AddOrUpdate<SendDepositReminder>(job => job.Execute(), Cron.Daily(15));



        }
    }
    

}