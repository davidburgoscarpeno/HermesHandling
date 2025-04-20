namespace HermesHandling.Server.Models.Usuarios
{
    public class CreateUserModel
    {
        public string Nombre { get; set; }

        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public tipo_usuario TipoUsuario { get; set; }

    }

    public enum tipo_usuario {
        AdminApp = 0,
        AdminCompañia = 1,
        Usuario = 2
    };
}
