using EjemploCifrado.Helper;
using HermesHandling.Data.Models;
using HermesHandling.Server.Models;
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

            using (HermesDbContext context = new HermesDbContext())
            {
                var usuario = context.Usuarios.FirstOrDefault(u => u.Id == model.Id);
                if (usuario == null)
                {
                    return NotFound(new { message = "Usuario no encontrado" });
                }
                var salt = Cifrado.GenerateSalt();
                var hashedPassword = Cifrado.HashPassword(model.Password, salt);
                usuario.Password = hashedPassword;
                usuario.Salt = salt;
               
                context.SaveChanges();
            }

            return Ok(new { message = "Password editado correctamente" });
        }
    }
}
