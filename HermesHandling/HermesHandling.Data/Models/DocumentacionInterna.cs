using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class DocumentacionInterna
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? PathDocumento { get; set; }

    public int? IdUsuarioAlta { get; set; }

    public DateTime? FechaAlta { get; set; }

    public int? IdUsuarioModificacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public bool? Activo { get; set; }

    public virtual Usuario? IdUsuarioAltaNavigation { get; set; }

    public virtual Usuario? IdUsuarioModificacionNavigation { get; set; }
}
