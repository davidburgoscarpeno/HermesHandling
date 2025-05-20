public class ReporteDto
{
    public int Id { get; set; }
    public string? Ubicacion { get; set; }
    public string? Observaciones { get; set; }
    public string? ObservacionesResuelto { get; set; }
    public bool Activo { get; set; }
    public DateTime? FechaCreacion { get; set; }
    public string? AssetIdEquipo { get; set; }
    public List<string> DefectosReportados { get; set; }
    public List<string> Documentos { get; set; }
}

