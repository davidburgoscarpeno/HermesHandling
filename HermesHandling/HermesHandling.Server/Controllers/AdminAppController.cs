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

        [HttpPost("edit-user")]
        public IActionResult EditUser([FromForm] CreateUserModel model)
        {
            if (_usuarioRepo.EditUser(model))
            {
                return Ok(new
                {
                    message = "Usuario editado con éxito"
                });
            }

            return BadRequest("No se pudo editar el usuario");
        }

        // ---------------------- DASHBOARD ----------------------

        // Datos resumen del dashboard
        [HttpGet("dashboard/resumen")]
        public IActionResult GetDashboardResumen()
        {
            ResumenDashboard resumen = new ResumenDashboard();


            DateTime haceUnaSemana = DateTime.Now.AddDays(-7);
            DateTime hoy = DateTime.Now.Date;

            using (HermesDbContext context = new HermesDbContext())
            {
                resumen.totalUsuarios = context.Usuarios.Count();
                resumen.nuevosSemana = context.Usuarios.Where(u => u.FechaCreacion >= haceUnaSemana).Count();
                resumen.admins = context.Usuarios.Where(u => u.TipoUsuario == 0).Count();

                resumen.usuariosActivos = context.Usuarios
                    .Where(u => u.UltimaSesion.HasValue && u.UltimaSesion.Value.Date == hoy)
                    .Count();
            }

            return Ok(resumen);
        }

        // Datos para el gráfico de usuarios activos por día
        [HttpGet("dashboard/usuarios-por-dia")]
        public IActionResult GetUsuariosPorDia()
        {
               
            using (HermesDbContext context = new HermesDbContext())
            {
                var datos = new[]
{       
                    //Crar una tabla para guardar cada vez que un usuario hace log-in
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
}
