using System;
using System.Collections.Generic;

namespace HermesHandling.Server.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string Email { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public int TipoUsuario { get; set; }

    public int? CompaniaId { get; set; }

    public bool? Activo { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public DateTime? UltimaSesion { get; set; }

    public virtual Compania? Compania { get; set; }

    public virtual ICollection<HistorialIncidencia> HistorialIncidencia { get; set; } = new List<HistorialIncidencia>();

    public virtual ICollection<Incidencia> IncidenciaAlta { get; set; } = new List<Incidencia>();

    public virtual ICollection<Incidencia> IncidenciaModificacions { get; set; } = new List<Incidencia>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();
}
