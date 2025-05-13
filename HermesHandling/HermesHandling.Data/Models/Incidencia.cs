using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class Incidencia
{
    public int Id { get; set; }

    public string Titulo { get; set; } = null!;

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public string? Prioridad { get; set; }

    public int? AltaId { get; set; }

    public int? ModificacionId { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public virtual Usuario? Alta { get; set; }

    public virtual ICollection<HistorialIncidencia> HistorialIncidencia { get; set; } = new List<HistorialIncidencia>();

    public virtual Usuario? Modificacion { get; set; }
}
