using EjemploCifrado.Helper;
using HermesHandling.Server.Models;
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

        #region Metodos Publicos

        //Metodo para buscar usuario y autentificar
        public Usuario Authenticate(LoginModel loginModel)
        {
            var usuario = _hermesDbContext.Usuarios
                                          .FirstOrDefault(u => u.Email == loginModel.Email);

            if (usuario == null || string.IsNullOrEmpty(usuario.Salt) || string.IsNullOrEmpty(usuario.Password))
            {
                return null;
            }

            try
            {
                bool isPasswordValid = Cifrado.VerifyPassword(loginModel.Password, usuario.Salt, usuario.Password);

                if (!isPasswordValid)
                {
                    return null; 
                }

               
                return usuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error durante la autenticación: {ex.Message}");
                return null;
            }
        }

        public List<Usuario> GetAdminsCompany()
        {
            var adminisApp =     _hermesDbContext.Usuarios.Where(u => (int)u.TipoUsuario == 1).ToList();
            if(adminisApp == null)
            {
                return null;
            } else
            {
                return adminisApp;
            }
        }

        public bool DeleteUser(int id)
        {
            var user = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Id == id);
            try
            {
                _hermesDbContext.Usuarios.Remove(user);
                _hermesDbContext.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
           
        }

        public Boolean CreateUser(CreateUserModel model)
        {
            if (model != null)
            {

                if (UserExist(model.Email, model.Nombre))
                {
                    return false;
                }

                String salt = Cifrado.GenerateSalt();
                String passwordEncrypted = Cifrado.HashPassword(model.Password, salt);

                Usuario usu = new Usuario()
                {
                    Nombre = model.Nombre,
                    Apellido = model.Apellido,
                    Email = model.Email,
                    Password = passwordEncrypted,
                    Salt = salt,
                    TipoUsuario = Usuario.tipoUsuario.Usuario
                };

                try
                {
                    _hermesDbContext.Usuarios.Add(usu);
                    _hermesDbContext.SaveChanges();
                    return true;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }



            }

            return false;

        }

        #endregion

        #region Metodos Privados

        public bool IsBase64String(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out _);
        }

        public bool UserExist(string email, string nombre)
        {
            try
            {
                var user = _hermesDbContext.Usuarios.FirstOrDefault(u => u.Email == email && u.Nombre == nombre);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return false;
        }

        #endregion
    }
}
