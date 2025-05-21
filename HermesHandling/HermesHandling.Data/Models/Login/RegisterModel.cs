namespace HermesHandling.Server.Models.Login
{
    public class RegisterModel
    {
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int TipoUsuario { get; set; } = 2; 
    }
}
