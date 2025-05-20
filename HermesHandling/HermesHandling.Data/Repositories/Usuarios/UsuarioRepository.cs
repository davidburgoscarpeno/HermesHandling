using EjemploCifrado.Helper;
using HermesHandling.Data.Models;
using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Models.Usuarios;
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

        #region Métodos Públicos

        // Método para autenticar usuario
        public Usuario Authenticate(LoginModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.Email) || string.IsNullOrEmpty(loginModel.Password))
                return null;

            var usuario = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Email == loginModel.Email);

            if (usuario == null || string.IsNullOrEmpty(usuario.Salt) || string.IsNullOrEmpty(usuario.Password))
                return null;

            try
            {
                bool isPasswordValid = Cifrado.VerifyPassword(loginModel.Password, usuario.Salt, usuario.Password);

                if (!isPasswordValid)
                    return null;

                // Actualizar última sesión
                usuario.UltimaSesion = DateTime.Now;
                _hermesDbContext.Usuarios.Update(usuario);
                _hermesDbContext.SaveChanges();

                return usuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error durante la autenticación: {ex.Message}");
                return null;
            }
        }

        // Obtener todos los usuarios
        public List<Usuario> GetUsers()
        {
            return _hermesDbContext.Usuarios.ToList();
        }

        // Eliminar un usuario por ID
        public bool DeleteUser(int id)
        {
            var user = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return false;

            try
            {
                _hermesDbContext.Usuarios.Remove(user);
                _hermesDbContext.SaveChanges();
                return true;
            }
            catch (Microsoft.Data.SqlClient.SqlException ex) when (ex.Message.Contains("FK__reportes__usuari"))
            {
                // El usuario tiene reportes asociados, no se puede borrar
                Console.WriteLine("No se puede eliminar el usuario porque tiene reportes asociados.");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar usuario: {ex.Message}");
                return false;
            }
        
        }

        // Crear un nuevo usuario
        public bool CreateUser(CreateUserModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return false;

            if (UserExist(model.Email, model.Nombre))
                return false;

            try
            {
                string salt = Cifrado.GenerateSalt();
                string passwordEncrypted = Cifrado.HashPassword(model.Password, salt);

                var usuario = new Usuario
                {
                    Nombre = model.Nombre,
                    Apellido = model.Apellido,
                    Email = model.Email,
                    Password = passwordEncrypted,
                    Salt = salt,
                    TipoUsuario = model.TipoUsuario,
                    Activo = model.Activo.HasValue && model.Activo.Value == 1,
                    FechaCreacion = DateTime.Now
                };

                _hermesDbContext.Usuarios.Add(usuario);
                _hermesDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear usuario: {ex.Message}");
                return false;
            }
        }

        // Editar un usuario existente
        public bool EditUser(CreateUserModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email))
                return false;

            var user = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
                return false;

            try
            {
                // Actualizar contraseña si ha cambiado
                if (!string.IsNullOrEmpty(model.Password) && user.Password != model.Password)
                {
                    string salt = Cifrado.GenerateSalt();
                    string passwordEncrypted = Cifrado.HashPassword(model.Password, salt);
                    user.Salt = salt;
                    user.Password = passwordEncrypted;
                }

                // Actualizar otros campos
                user.Nombre = model.Nombre;
                user.Apellido = model.Apellido;
                user.TipoUsuario = model.TipoUsuario;
                user.Activo = model.Activo.HasValue && model.Activo.Value == 1;
                user.FechaModificacion = DateTime.Now;

                _hermesDbContext.Usuarios.Update(user);
                _hermesDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al editar usuario: {ex.Message}");
                return false;
            }
        }

        //Metodo para actualizar la contraseña del usuario por si mismo
        public bool UpdatePassword(int userId, string newPassword)
        {
            var usuario = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Id == userId);
            if (usuario == null)
                return false;

            try
            {
                string salt = Cifrado.GenerateSalt();
                string passwordEncrypted = Cifrado.HashPassword(newPassword, salt);
                usuario.Salt = salt;
                usuario.Password = passwordEncrypted;
                usuario.FechaModificacion = DateTime.Now;

                _hermesDbContext.Usuarios.Update(usuario);
                _hermesDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar contraseña: {ex.Message}");
                return false;
            }
        }

        #endregion

        #region Métodos Privados

        // Verificar si un usuario ya existe
        public bool UserExist(string email, string nombre)
        {
            return _hermesDbContext.Usuarios.Any(u => u.Email == email && u.Nombre == nombre);
        }

        // Validar si una cadena es Base64
        public bool IsBase64String(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out _);
        }

        #endregion
    }
}
