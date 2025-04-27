using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HermesHandling.Server.Models.Incidencias;
using HermesHandling.Server.Models.Usuarios;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models.Incidencias;

public partial class Incidencia
{
    [Key]
    public int Id { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string Titulo { get; set; } = null!;

    [Column(TypeName = "text")]
    public string? Descripcion { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Estado { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Prioridad { get; set; }

    public int? Alta_id { get; set; }

    public int? Modificacion_id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    [ForeignKey("alta_id")]
    public virtual Usuario? Alta { get; set; }

    public virtual ICollection<Historial_Incidencia> historial_incidencia { get; set; } = new List<Historial_Incidencia>();

    [ForeignKey("modificacion_id")]
    public virtual Usuario? Modificacion { get; set; }
}
