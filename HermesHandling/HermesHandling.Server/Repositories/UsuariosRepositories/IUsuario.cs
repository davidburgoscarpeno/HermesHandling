using HermesHandling.Server.Models.Login;
using HermesHandling.Server.Models;

namespace HermesHandling.Server.Repositories.UsuariosRepositories
{
    public interface IUsuario
    {
        Usuario Authenticate(LoginModel loginModel);
    }
}
