using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class Comunicacione
{
    public int Id { get; set; }

    public string? Asunto { get; set; }

    public string? Mensaje { get; set; }

    public string? PathDocumento { get; set; }

    public DateTime? FechaPublicacion { get; set; }

    public int? IdUsuarioAlta { get; set; }

    public DateTime? FechaAlta { get; set; }

    public int? IdUsuarioModificacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public virtual Usuario? IdUsuarioAltaNavigation { get; set; }

    public virtual Usuario? IdUsuarioModificacionNavigation { get; set; }
}
