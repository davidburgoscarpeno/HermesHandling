using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class ConfigurationKey
{
    public int Id { get; set; }

    public string Clave { get; set; } = null!;

    public string Valor { get; set; } = null!;

    public string? Descripcion { get; set; }

    public string? Tipo { get; set; }

    public bool? Activa { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }
}
