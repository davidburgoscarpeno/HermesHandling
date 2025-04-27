using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

[Table("documentacion_interna")]
public partial class Documentacion_Interna
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Nombre { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Path_documento { get; set; }

    public int? Id_usuario_alta { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_alta { get; set; }

    public int? Id_usuario_modificacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    public bool? Activo { get; set; }

    [ForeignKey("id_usuario_alta")]
    public virtual Usuario? id_usuario_altaNavigation { get; set; }

    [ForeignKey("id_usuario_modificacion")]
    public virtual Usuario? id_usuario_modificacionNavigation { get; set; }
}
