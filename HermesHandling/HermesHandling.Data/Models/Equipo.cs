using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class Equipo
{
    public int Id { get; set; }

    public string? AssetId { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int? TipoEquipoId { get; set; }

    public string? Estado { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaUltimaRevision { get; set; }

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();

    public virtual TiposEquipo? TipoEquipo { get; set; }
}
