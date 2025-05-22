namespace HermesHandling.Server.Models.DocumentacionInterna
{
    public class DocumentacionInternaViewModel
    {
        public string Nombre { get; set; }
        public IFormFile Documento { get; set; }

        public int? IdAlta { get; set; }
        public int? IdMod { get; set; }
    }

}
