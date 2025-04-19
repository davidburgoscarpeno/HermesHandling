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
                // Validar que la contraseña almacenada sea válida en Base64
                if (!IsBase64String(usuario.Contraseña))
                {
                    Console.WriteLine("La contraseña almacenada no es válida en formato Base64.");
                    return null;
                }

                // Convertir la contraseña almacenada
                byte[] storedPassword = Convert.FromBase64String(usuario.Contraseña);

                // Continuar con la lógica de comparación
                byte[] encryptedPassword = Cifrado.EncryptPassword(loginModel.Password, usuario.Salt);

                if (!Cifrado.CompareArrays(storedPassword, encryptedPassword))
                {
                    return null; // Las contraseñas no coinciden
                }

                return usuario;
            }
            catch (FormatException ex)
            {
                Console.WriteLine($"Error de formato en la contraseña almacenada: {ex.Message}");
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
