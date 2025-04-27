using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HermesHandling.Server.Models.Incidencias;
using HermesHandling.Server.Models.Usuarios;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models.Incidencias;

public partial class Historial_Incidencia
{
    [Key]
    public int Id { get; set; }

    public int? Incidencia_id { get; set; }

    public int? Usuario_id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Accion { get; set; }

    [Column(TypeName = "text")]
    public string? Comentario { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_accion { get; set; }

    [ForeignKey("incidencia_id")]
    public virtual Incidencia? Incidencia { get; set; }

    [ForeignKey("usuario_id")]
    public virtual Usuario? Usuario { get; set; }
}
