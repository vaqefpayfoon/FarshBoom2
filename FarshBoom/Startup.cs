using System.Net;
using System.Text;
using AutoMapper;
using FarshBoom.Helpers;
using FarshBoom.Data;
using FarshBoom.Generic;
using FarshBoom.Repositories.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace FarshBoom
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        //dotnet publish -c Release -o ./publish
       public void ConfigureServices(IServiceCollection services)
        {       
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("SqlCnn")));
            services.AddCors(options => options.AddPolicy("ApiCorsPolicy", build =>
                {                
                    build.WithOrigins("http://localhost:4200", "http://newsite.farshboom.com", "http://localhost:5000")
                        .AllowAnyMethod()
                        .AllowAnyHeader().AllowCredentials();
                }));
                

            services.AddAutoMapper(typeof(Startup));
            // Add framework services.
            services.AddMvc();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IAuthRepository,AuthRepository>();
            services.AddTransient<Seed>();
            services.AddControllers().
            AddNewtonsoftJson(options =>
            {           
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                
            });

            services.AddAuthentication( x => {
                 x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                });
            
            //services.AddTransient<Seed>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null) 
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                app.UseHsts();
            }

            //app.UseHttpsRedirection();

            // Use the CORS policy
            seeder.SeedUsers();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseRouting();
            app.UseCors("ApiCorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
