using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hangfire;
using Owin;
using Microsoft.Extensions.DependencyInjection;
using Hangfire.Server;

namespace INF370_API.Models
{
   

   
        public class Hangfire
        {
            public static void ConfigureHangfire(IAppBuilder app)
            {
                GlobalConfiguration.Configuration
                    .UseSqlServerStorage("Data Source=DESKTOP-R84BLOF;Initial Catalog=INF370;Integrated Security=True");

                app.UseHangfireDashboard("/jobs");
                app.UseHangfireServer();
            }

            public static void InitializeJobs()
            {
            RecurringJob.AddOrUpdate<SendPaymentReminder>(job => job.Execute(),Cron.Monthly(25,12));
        }
    }
    

}