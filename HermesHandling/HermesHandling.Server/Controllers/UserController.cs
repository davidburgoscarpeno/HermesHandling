using EjemploCifrado.Helper;
using HermesHandling.Data.Models;
using HermesHandling.Server.Models;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using Microsoft.AspNetCore.Mvc;

namespace HermesHandling.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        [HttpPut("edit-password")]
        public IActionResult EditarPassword([FromBody] CambiarPasswordModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.Password))
                return BadRequest(new { message = "Datos inválidos" });

            // Usa inyección de dependencias si es posible, si no, crea el contexto aquí
            using (HermesDbContext context = new HermesDbContext())
            {
                var repo = new UsuarioRepository(context);
                var result = repo.UpdatePassword(model.Id, model.Password);
                if (!result)
                    return NotFound(new { message = "Usuario no encontrado" });
            }

            return Ok(new { message = "Password editado correctamente" });
        }
    }
}
