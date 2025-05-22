using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Data.Models;

public partial class Reporte
{
    public int Id { get; set; }

    public int? EquipoId { get; set; }

    public int? UsuarioId { get; set; }

    public string? Ubicacion { get; set; }

    public string? Observaciones { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public bool Activo { get; set; }

    public string? ObservacionesResuelto { get; set; }

    public virtual Equipo? Equipo { get; set; }

    public virtual ICollection<EquiposReportesHistorial> EquiposReportesHistorials { get; set; } = new List<EquiposReportesHistorial>();

    public virtual Usuario? Usuario { get; set; }
}
