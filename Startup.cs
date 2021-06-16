using System;
using System.Threading.Tasks;
using AirBNB_React_App;
using InsideAirBnb.Helpers;
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
using Microsoft.IdentityModel.Tokens;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;
using Microsoft.AspNetCore.CookiePolicy;
using StackExchange.Redis;

namespace InsideAirBnb
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression();

            services.AddControllersWithViews();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.None;
                options.Secure = CookieSecurePolicy.Always;
                options.HttpOnly = HttpOnlyPolicy.Always;
            });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            services.AddAuthentication(options => { options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
                .AddJwtBearer(options =>
                {
                    options.Authority = Configuration.GetValue<string>("AzureAd:Authority");

                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = Configuration.GetValue<string>("AzureAd:ValidAudience")
                    };
                });

            services.AddDbContext<AirBNBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AIRBNB")));

            services.AddMiniProfiler(options =>
            {
                options.SqlFormatter = new StackExchange.Profiling.SqlFormatters.InlineFormatter();
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

            services.AddScoped<IListingsRepository, ListingRepository>();
            services.AddScoped<IChartsRepository, ChartsRepository>();
            services.AddTransient<IListingCachingHelper, ListingCachingHelper>();
            services.AddSingleton<IConnectionMultiplexer>(
                ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseResponseCompression();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseHsts();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseCookiePolicy();

            app.UseMiniProfiler();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapMiniProfilerIncludes(new RenderOptions
                {
                    StartHidden = true,
                    PopupToggleKeyboardShortcut = "Ctrl+m"
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