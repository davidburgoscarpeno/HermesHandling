using Microsoft.AspNetCore.Mvc;
using HermesHandling.Server.Models; // Si tienes un modelo para el usuario
using System.Linq;

namespace HermesHandling.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly HermesDbContext _context;

        public AccountController(HermesDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            // Verificar si el usuario existe en la base de datos
            var user = _context.Usuarios
                               .FirstOrDefault(u => u.Email == model.Email && u.Contraseña == model.Password);

            if (user == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Aquí podrías generar un token JWT si lo necesitas
            return Ok(new { message = "Login exitoso" });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
