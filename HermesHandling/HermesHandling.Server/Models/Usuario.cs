using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

[Index("Email", Name = "UQ_usuarios_email", IsUnique = true)]
public partial class Usuario
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string? Nombre { get; set; }

    [StringLength(100)]
    public string? Apellido { get; set; }

    [StringLength(150)]
    public string? Email { get; set; }

    [StringLength(512)]
    public string? Password { get; set; }

    [StringLength(100)]
    public string? Salt { get; set; }

    public tipoUsuario Tipo_usuario { get; set; }

    public bool? Activo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Ultima_sesion { get; set; }

    public virtual ICollection<Comunicaciones> Comunicacioneid_usuario_altaNavigations { get; set; } = new List<Comunicaciones>();

    public virtual ICollection<Comunicaciones> Comunicacioneid_usuario_modificacionNavigations { get; set; } = new List<Comunicaciones>();

    public virtual ICollection<Documentacion_Interna> Documentacion_internaid_usuario_altaNavigations { get; set; } = new List<Documentacion_Interna>();

    public virtual ICollection<Documentacion_Interna> Documentacion_internaid_usuario_modificacionNavigations { get; set; } = new List<Documentacion_Interna>();

    public virtual ICollection<Historial_Incidencia> Historial_incidencia { get; set; } = new List<Historial_Incidencia>();

    public virtual ICollection<Incidencia> Incidenciaalta { get; set; } = new List<Incidencia>();

    public virtual ICollection<Incidencia> Incidenciamodificacions { get; set; } = new List<Incidencia>();

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();

    public virtual ICollection<Reportes_Documento> Reportes_documentos { get; set; } = new List<Reportes_Documento>();
}

public enum tipoUsuario
{
    AdminApp = 0,
    AdminCompany = 1,
    Usuario = 2
}