using System;
using System.Collections.Generic;

namespace HermesHandling.Server.Models;

public partial class Compania
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string CodigoIcao { get; set; } = null!;

    public string? Pais { get; set; }

    public bool? Activa { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
