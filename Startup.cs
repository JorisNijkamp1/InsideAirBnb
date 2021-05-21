using AirBNB_React_App;
using InsideAirBnb.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StackExchange.Profiling;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;

namespace InsideAirBnb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                // TODO: the tenant id (authority) and client id (audience) 
                // should normally be pulled from the config file or ENV vars.
                // this code uses an inline example for brevity.
                // TODO moet met gecommende regel gebeuren
                //         options.Authority = Configuration.GetValue<string>("AzureAd:Instance") +
                options.Authority = "https://login.microsoftonline.com/148557d6-6224-4786-a040-c97e6c391f34";
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    // TODO moet met gecommende regel gebeuren
                    // options.Audience = Configuration.GetValue<string>("AzureAd:Audience");
                    ValidAudience = "5307daf7-fec8-4a85-9f63-d2ef7b0dc118"
                };
            });
            

            services.AddDbContext<AirBNBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AIRBNB")));

            services.AddMiniProfiler();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

            services.AddScoped<IListingsRepository, ListingRepository>();
            services.AddScoped<IRegisterRepository, RegisterRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            
            app.UseCors("CorsPolicy");
            
            // app.UseCors(builder => builder.WithOrigins("https://localhost:5001").AllowAnyHeader().AllowAnyMethod()
            //     .AllowCredentials());

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseMiniProfiler();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapMiniProfilerIncludes(new RenderOptions
                {
                    StartHidden = true,
                    PopupToggleKeyboardShortcut = "Ctrl+m",
                });
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}