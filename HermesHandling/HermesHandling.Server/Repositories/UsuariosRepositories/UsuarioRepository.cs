using EjemploCifrado.Helper;
using HermesHandling.Server.Models;
using HermesHandling.Server.Models.Login;
using System.Security.Cryptography;

namespace HermesHandling.Server.Repositories.UsuariosRepositories
{
    public class UsuarioRepository : IUsuario
    {
        private readonly HermesDbContext _hermesDbContext;

        public UsuarioRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }

        #region Metodos Publicos

        //Metodo para buscar usuario y autentificar
        public Usuario Authenticate(LoginModel loginModel)
        {
            // Buscar usuario por Email en la base de datos
            var usuario = _hermesDbContext.Usuarios
                                          .FirstOrDefault(u => u.Email == loginModel.Email);

            // Validar si el usuario y los datos requeridos existen
            if (usuario == null || string.IsNullOrEmpty(usuario.Salt) || string.IsNullOrEmpty(usuario.Contraseña))
            {
                return null;
            }

            try
            {
                // Validar la contraseña proporcionada contra la almacenada
                bool isPasswordValid = Cifrado.VerifyPassword(loginModel.Password, usuario.Salt, usuario.Contraseña);

                if (!isPasswordValid)
                {
                    return null; // Las contraseñas no coinciden
                }

                // Si la contraseña es válida, devolver el usuario
                return usuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error durante la autenticación: {ex.Message}");
                return null;
            }
        }

        #endregion

        #region Metodos Privados

        private bool IsBase64String(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out _);
        }

        #endregion
    }
}
