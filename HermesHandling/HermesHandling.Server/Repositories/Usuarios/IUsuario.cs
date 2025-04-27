using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Models;
using HermesHandling.Server.Models.Usuarios;

namespace HermesHandling.Server.Repositories.UsuariosRepositories
{
    public interface IUsuario
    {
        Usuario Authenticate(LoginModel loginModel);
        public List<Usuario> GetUsers();


        Boolean CreateUser(CreateUserModel model);
        bool DeleteUser(int id);


        bool IsBase64String(string base64);

        bool UserExist(string email, string nombre);

        bool EditUser(CreateUserModel model);

    }
}
