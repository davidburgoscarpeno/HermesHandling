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

        public AdminAppController(IUsuario usuarioRepo)
        {
            _usuarioRepo = usuarioRepo;
        }

        // Ruta para listar los administradores de la empresa
        [HttpGet("listar-usuarios")]
        public IActionResult ListarUsuariosApp()
        {
            var users = _usuarioRepo.GetUsers();
            return Ok(users);
        }

        // Ruta para crear un nuevo usuario (POST)
        [HttpPost("create-user")]
        public IActionResult CreateUser([FromBody] CreateUserModel model)
        {
            if (!_usuarioRepo.UserExist(model.Email, model.Nombre))
            {
                if (_usuarioRepo.CreateUser(model))
                {
                    return Ok(new
                    {
                        message = "Usuario creado con éxito"
                    });
                }
            }

            return BadRequest("No se pudo crear el usuario");
        }

        // Ruta para eliminar un usuario (cambiado a DELETE)
        [HttpDelete("delete-user/{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            if (_usuarioRepo.DeleteUser(id))
            {
                return Ok(new
                {
                    message = "Usuario borrado con éxito"
                });
            }

            return BadRequest("No se pudo borrar el usuario");
        }

        // ---------------------- DASHBOARD ----------------------

        // Datos resumen del dashboard
        [HttpGet("dashboard/resumen")]
        public IActionResult GetDashboardResumen()
        {
            var resumen = new
            {
                totalUsuarios = 152,
                usuariosActivosHoy = 37,
                nuevosRegistrosSemana = 12,
                admins = 5
            };

            return Ok(resumen);
        }

        // Datos para el gráfico de usuarios activos por día
        [HttpGet("dashboard/usuarios-por-dia")]
        public IActionResult GetUsuariosPorDia()
        {
            var datos = new[]
            {
                new { dia = "Lunes", cantidad = 10 },
                new { dia = "Martes", cantidad = 14 },
                new { dia = "Miércoles", cantidad = 7 },
                new { dia = "Jueves", cantidad = 20 },
                new { dia = "Viernes", cantidad = 12 },
                new { dia = "Sábado", cantidad = 5 },
                new { dia = "Domingo", cantidad = 3 }
            };

            return Ok(datos);
        }
    }
}
