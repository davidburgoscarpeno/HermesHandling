// AccountController.cs
using Microsoft.AspNetCore.Mvc;
using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using HermesHandling.Server.Models.Usuarios;
using HermesHandling.Data.Models;

namespace HermesHandling.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUsuario _usuarioRepo;

        public AccountController(IUsuario usuarioRepo)
        {
            _usuarioRepo = usuarioRepo;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
            }
            var usuario = _usuarioRepo.Authenticate(model);

            if (usuario == null)
                return Unauthorized("Usuario o contraseña incorrectos");

            return Ok(new
            {
                message = "Login exitoso",
                idUsuario = usuario.Id,
                nombreUsuario = usuario.Nombre,
                email = usuario.Email,
                tipoUsuario = usuario.TipoUsuario
            });
        }

            
        

    }
}
