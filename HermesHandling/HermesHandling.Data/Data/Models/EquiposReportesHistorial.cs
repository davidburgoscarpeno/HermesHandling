using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Data.Models;

public partial class EquiposReportesHistorial
{
    public int Id { get; set; }

    public int EquipoId { get; set; }

    public int ReporteId { get; set; }

    public int UsuarioId { get; set; }

    public string? Descripcion { get; set; }

    public DateTime FechaIncidente { get; set; }

    public string? TipoIncidente { get; set; }

    public bool Activo { get; set; }

    public virtual Equipo Equipo { get; set; } = null!;

    public virtual Reporte Reporte { get; set; } = null!;

    public virtual Usuario Usuario { get; set; } = null!;
}
