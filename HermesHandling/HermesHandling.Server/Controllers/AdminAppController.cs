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
        [HttpGet("listar-admins-app")]
        public IActionResult ListarAdministradoresApp()
        {
            var admins = _usuarioRepo.GetAdminsCompany();
            return Ok(admins);
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

    }
}
