// AccountController.cs
using Microsoft.AspNetCore.Mvc;
using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Repositories.UsuariosRepositories;
using HermesHandling.Server.Models.Usuarios;
using HermesHandling.Data.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HermesHandling.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUsuario _usuarioRepo;
        private readonly IConfiguration _config;

        public AccountController(IUsuario usuarioRepo, IConfiguration config)
        {
            _usuarioRepo = usuarioRepo;
            _config = config;
        }

        #region Metodos Publicos

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var usuario = _usuarioRepo.Authenticate(model);

            if (usuario == null)
                return Unauthorized(new { message = "Usuario o contraseña incorrectos" });

            // Claims con los datos del usuario
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
                new Claim("nombreUsuario", usuario.Nombre ?? ""),
                new Claim("email", usuario.Email ?? ""),
                new Claim("tipoUsuario", usuario.TipoUsuario.ToString())
            };

            // Obtiene la clave, issuer y audience desde la configuración
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            using(HermesDbContext context = new HermesDbContext())
            {
                RegistroLogin registro = new RegistroLogin()
                {
                    Fecha = DateTime.Now,
                    UserId = usuario.Id,
                };
                context.RegistroLogin.Add(registro);
                context.SaveChanges();
            }



            // Devuelve el token y los datos del usuario
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                usuario = new
                {
                    idUsuario = usuario.Id,
                    nombreUsuario = usuario.Nombre,
                    email = usuario.Email,
                    tipoUsuario = usuario.TipoUsuario, // numérico
                    tipoUsuarioNombre = GetTipoUsuarioNombre(usuario.TipoUsuario) // texto
                }
            });

        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Nombre))
                return BadRequest(new { message = "Nombre, email y contraseña son obligatorios." });

            if (_usuarioRepo.UserExist(model.Email, model.Nombre))
                return Conflict(new { message = "El usuario ya existe con ese email o nombre." });

            var createUserModel = new CreateUserModel
            {
                Nombre = model.Nombre,
                Apellido = model.Apellido,
                Email = model.Email,
                Password = model.Password,
                TipoUsuario = model.TipoUsuario,
                Activo = 1
            };

            var result = _usuarioRepo.CreateUser(createUserModel);

            if (!result)
                return StatusCode(500, new { message = "No se pudo crear el usuario. Inténtalo de nuevo." });

            // Solo responde con éxito, sin token ni login automático
            return Ok(new { message = "Usuario registrado correctamente." });
        }

        #endregion

        #region Metodos Privados


        private string GetTipoUsuarioNombre(int tipoUsuario)
        {
            return tipoUsuario switch
            {
                0 => "admin",
                1 => "coordinador",
                2 => "usuario",
                _ => "desconocido"
            };
        }
        #endregion

    }
}
