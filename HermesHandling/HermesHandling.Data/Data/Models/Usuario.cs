using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Data.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Salt { get; set; }

    public int TipoUsuario { get; set; }

    public bool? Activo { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public DateTime? UltimaSesion { get; set; }

    public virtual ICollection<EquiposReportesHistorial> EquiposReportesHistorials { get; set; } = new List<EquiposReportesHistorial>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
