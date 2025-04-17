using System;
using System.Collections.Generic;

namespace HermesHandling.Server.Models;

public partial class Mantenimiento
{
    public int Id { get; set; }

    public int? EquipoId { get; set; }

    public string? TipoMantenimiento { get; set; }

    public string? Descripcion { get; set; }

    public DateTime? FechaMantenimiento { get; set; }

    public int? UsuarioId { get; set; }

    public virtual Equipo? Equipo { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
