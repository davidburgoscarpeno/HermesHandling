public class CrearReporteViewModel
{
    public int EquipoId { get; set; }
    public int UsuarioId { get; set; }
    public string Ubicacion { get; set; }
    public string Observaciones { get; set; }
    public int TipoDefectoId { get; set; } // <-- aqu� el nombre correcto
    public List<IFormFile>? Documentos { get; set; }
}
