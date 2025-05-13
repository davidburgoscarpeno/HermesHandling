using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class ReportesDocumento
{
    public int Id { get; set; }

    public int? ReporteId { get; set; }

    public string? Nombre { get; set; }

    public string? PathDocumento { get; set; }

    public string? TipoDocumento { get; set; }

    public DateTime? FechaSubida { get; set; }

    public int? UsuarioId { get; set; }

    public bool? Activo { get; set; }

    public virtual Reporte? Reporte { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
