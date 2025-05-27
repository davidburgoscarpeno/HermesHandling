using Microsoft.EntityFrameworkCore;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using HermesHandling.Server.Repositories.MantenimientoRepositories;
using HermesHandling.Data.Models; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Agregar CORS para permitir solicitudes desde el frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
    );
});

// Agregar el contexto de la base de datos
builder.Services.AddDbContext<HermesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Configuración JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "tu_issuer",
            ValidAudience = "tu_audience",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TU_CLAVE_SECRETA_AQUI"))
        };
    });

builder.Services.AddAuthorization();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Inyecto los repositorios
builder.Services.AddScoped<IUsuario, UsuarioRepository>();
builder.Services.AddScoped<IReporte, ReporteRepository>();
builder.Services.AddScoped<IDashboard, DashboardRepository>();
builder.Services.AddScoped<IDocumentacionInternaRepository, DocumentacionInternaRepository>();
builder.Services.AddScoped<IComunicacionesRepository, ComunicacionesRepository>();
builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
builder.Services.AddScoped<IReporte, ReporteRepository>();
builder.Services.AddScoped<IDefectosReportadoRepository, DefectosReportadoRepository>();
builder.Services.AddScoped<IReportesDocumentoRepository, ReportesDocumentoRepository>();
builder.Services.AddScoped<ITiposDefectoRepository, TiposDefectoRepository>();
builder.Services.AddScoped<ITiposEquipoRepository, TiposEquipoRepository>();
builder.Services.AddSignalR(); //Añado el paquete para el livechat






var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configurar la política CORS
app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chathub");
app.MapFallbackToFile("/index.html");

app.Run();
