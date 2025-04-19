using Microsoft.EntityFrameworkCore;
using HermesHandling.Server.Models;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using HermesHandling.Server.Repositories.MantenimientoRepositories; // Aseg�rate de que el namespace del contexto sea correcto

var builder = WebApplication.CreateBuilder(args);

// Agregar el contexto de la base de datos
builder.Services.AddDbContext<HermesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Inyecto los repositorios
builder.Services.AddScoped<IUsuario, UsuarioRepository>(); // Aseg�rate de que UsuarioRepository implemente IUsuario




var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();