using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class Reporte
{
    public int Id { get; set; }

    public int? EquipoId { get; set; }

    public int? UsuarioId { get; set; }

    public string? Ubicacion { get; set; }

    public string? Observaciones { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public virtual ICollection<DefectosReportado> DefectosReportados { get; set; } = new List<DefectosReportado>();

    public virtual Equipo? Equipo { get; set; }

    public virtual ICollection<ReportesDocumento> ReportesDocumentos { get; set; } = new List<ReportesDocumento>();

    public virtual Usuario? Usuario { get; set; }
}
