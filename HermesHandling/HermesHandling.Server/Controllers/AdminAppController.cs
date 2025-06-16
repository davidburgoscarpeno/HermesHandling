using HermesHandling.Data.Models;
using HermesHandling.Server.Models;
using HermesHandling.Server.Models.Usuarios;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using Microsoft.AspNetCore.Mvc;

namespace HermesHandling.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminAppController : Controller
    {
        private readonly IUsuario _usuarioRepo;
        private readonly IDashboard _dashboardRepo;

        public AdminAppController(IUsuario usuarioRepo, IDashboard dashboardRepo)
        {
            _usuarioRepo = usuarioRepo;
            _dashboardRepo = dashboardRepo;
        }

        [HttpGet("listar-usuarios")]
        public IActionResult ListarUsuariosApp()
        {
            var users = _usuarioRepo.GetUsers();
            return Ok(users);
        }

        [HttpPost("create-user")]
        public IActionResult CreateUser([FromBody] CreateUserModel model)
        {
            if (!_usuarioRepo.UserExist(model.Email, model.Nombre))
            {
                if (_usuarioRepo.CreateUser(model))
                {
                    return Ok(new { message = "Usuario creado con éxito" });
                }
            }
            return BadRequest("No se pudo crear el usuario");
        }

        [HttpDelete("delete-user/{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            if (_usuarioRepo.DeleteUser(id))
            {
                return Ok(new { message = "Usuario borrado con éxito" });
            }
            return BadRequest("No se pudo borrar el usuario");
        }

        [HttpPost("edit-user")]
        public IActionResult EditUser([FromForm] CreateUserModel model)
        {
            if (_usuarioRepo.EditUser(model))
            {
                return Ok(new { message = "Usuario editado con éxito" });
            }
            return BadRequest("No se pudo editar el usuario");
        }

        // ---------------------- DASHBOARD ----------------------

        [HttpGet("dashboard/resumen")]
        public IActionResult GetDashboardResumen()
        {
            var resumen = _dashboardRepo.GetResumen();
            return Ok(resumen);
        }

        [HttpGet("dashboard/usuarios-por-dia")]
        public IActionResult GetUsuariosPorDia()
        {
            // Este método requiere una tabla de auditoría de logins para hacerlo real.
            // Por ahora, puedes dejarlo como está o implementarlo en el repositorio.
            var datos = new[]
            {
                new { dia = "Lunes", cantidad = 25 },
                new { dia = "Martes", cantidad = 12 },
                new { dia = "Miércoles", cantidad = 7 },
                new { dia = "Jueves", cantidad = 3 },
                new { dia = "Viernes", cantidad = 23 },
                new { dia = "Sábado", cantidad = 22 },
                new { dia = "Domingo", cantidad = 21 }
            };
            return Ok(datos);
        }

 
    }
}
