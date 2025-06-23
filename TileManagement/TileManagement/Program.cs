using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TileManagement.Data;

namespace TileManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ✅ Add services to the container
            builder.Services.AddRazorPages();
            builder.Services.AddControllers(); // For Web API

            // ✅ Add DbContext with MySQL
            var connectionString = builder.Configuration.GetConnectionString("MySqlConn");
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            });

            // ✅ Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // ✅ Add JWT Authentication
            var jwtKey = builder.Configuration["Jwt:Key"];
            var jwtIssuer = builder.Configuration["Jwt:Issuer"];
            var jwtAudience = builder.Configuration["Jwt:Audience"];

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
                    };
                });

            var app = builder.Build();

            // ✅ Configure the HTTP request pipeline
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles(); // ✅ Serve static files

            app.UseRouting();

            app.UseCors("AllowAll"); // ✅ Apply CORS policy

            app.UseAuthentication(); // ✅ JWT authentication
            app.UseAuthorization();

            // ✅ Map API controllers and Razor pages
            app.MapControllers();
            app.MapRazorPages();

            app.Run();
        }
    }
}
