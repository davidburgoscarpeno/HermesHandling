using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class Comunicaciones
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Asunto { get; set; }

    [Column(TypeName = "text")]
    public string? Mensaje { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Path_documento { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_publicacion { get; set; }

    public int? Id_usuario_alta { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_alta { get; set; }

    public int? Id_usuario_modificacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    [ForeignKey("id_usuario_alta")]
    public virtual Usuario? Id_usuario_altaNavigation { get; set; }

    [ForeignKey("id_usuario_modificacion")]
    public virtual Usuario? Id_usuario_modificacionNavigation { get; set; }
}
