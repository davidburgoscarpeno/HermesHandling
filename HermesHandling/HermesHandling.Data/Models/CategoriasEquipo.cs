using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class CategoriasEquipo
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public virtual ICollection<TiposEquipo> TiposEquipos { get; set; } = new List<TiposEquipo>();
}
