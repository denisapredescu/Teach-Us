using MANDAT.BusinessLogic.Interfaces;
using MANDAT.BusinessLogic.Services;
using MANDAT.Common.Features.PasswordHashing;
using Microsoft.AspNetCore.Hosting;
using MANDAT.DataAccess;
using MANDATWebApp.Code.ExtensionMethods;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;





var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
var configuration = builder.Configuration;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MANDATApp", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });
    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
});
builder.Services.AddControllersWithViews()
        .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

//database conexion

/*string conexiuneString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MANDATContext>(
     options =>
     {
         options.UseSqlServer(conexiuneString);
     });

*/
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddDbContext<MANDATContext>();
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddPresentation();
builder.Services.AddMANDATAppCurrentUser();
builder.Services.AddMANDATAppBusinessLogic(configuration);
builder.Services.AddCors(p => p.AddPolicy("MANDATApp", builder =>
{
    builder.WithOrigins("*")
    .WithMethods("GET", "PUT", "DELETE", "POST", "PATCH")
    .AllowAnyHeader();
}));


//services here


///


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();


app.UseRouting();
app.UseCors("MANDATApp");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
