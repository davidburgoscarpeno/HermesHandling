using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

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

    public virtual ICollection<Comunicacione> ComunicacioneIdUsuarioAltaNavigations { get; set; } = new List<Comunicacione>();

    public virtual ICollection<Comunicacione> ComunicacioneIdUsuarioModificacionNavigations { get; set; } = new List<Comunicacione>();

    public virtual ICollection<DocumentacionInterna> DocumentacionInternaIdUsuarioAltaNavigations { get; set; } = new List<DocumentacionInterna>();

    public virtual ICollection<DocumentacionInterna> DocumentacionInternaIdUsuarioModificacionNavigations { get; set; } = new List<DocumentacionInterna>();


    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();

    public virtual ICollection<ReportesDocumento> ReportesDocumentos { get; set; } = new List<ReportesDocumento>();
}
