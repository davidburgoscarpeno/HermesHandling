namespace HermesHandling.Server.Models.Usuarios
{
    public class CreateUserModel
    {
        public string Nombre { get; set; }

        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int TipoUsuario { get; set; }

        public int? Activo { get; set; }

    }

   
}
