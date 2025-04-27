using EjemploCifrado.Helper;
using HermesHandling.Server.Models.Context;
using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Models.Usuarios;
using System.Security.Cryptography;
using static HermesHandling.Server.Models.Usuarios.Usuario;

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

                using(HermesDbContext context = new HermesDbContext())
                {
                    usuario.Ultima_sesion = DateTime.Now;
                    context.Usuarios.Update(usuario);
                    context.SaveChanges();
                }
               
                return usuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error durante la autenticación: {ex.Message}");
                return null;
            }
        }

        public List<Usuario> GetUsers()
        {
            var users = _hermesDbContext.Usuarios.ToList();
            if(users == null)
            {
                return null;
            } else
            {
                return users;
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
                    Tipo_usuario = (tipoUsuario)model.TipoUsuario,
                    Fecha_creacion = DateTime.Now
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

        public Boolean EditUser(CreateUserModel model)
        {
            if (model != null)
            {

                using(HermesDbContext context = new HermesDbContext())
                {
                    var user = context.Usuarios.FirstOrDefault(u => u.Email == model.Email);
                    if (user.Password != model.Password)
                    {
                        String salt = Cifrado.GenerateSalt();
                        String passwordEncrypted = Cifrado.HashPassword(model.Password, salt);
                        user.Salt = salt;
                        user.Password = passwordEncrypted;
                    }
      
                    user.Email = model.Email;
                    user.Nombre = model.Nombre;
                    user.Apellido = model.Apellido;
                    user.Tipo_usuario =(tipoUsuario)model.TipoUsuario;
                    // model.Activo es bool
                    user.Activo = Convert.ToBoolean(model.Activo);
                    user.Fecha_modificacion = DateTime.Now;

               

                try
                {
                    _hermesDbContext.Usuarios.Update(user);
                    _hermesDbContext.SaveChanges();
                    return true;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }

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

                if (user != null)
                {
                    return true;
                }
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
