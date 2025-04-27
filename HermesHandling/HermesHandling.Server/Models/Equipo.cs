using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class Equipo
{
    [Key]
    public int id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Asset_id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string? Descripcion { get; set; }

    public int? Tipo_equipo_id { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Estado { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_ultima_revision { get; set; }

    public virtual ICollection<Mantenimiento> Mantenimientos { get; set; } = new List<Mantenimiento>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();

    [ForeignKey("tipo_equipo_id")]
    public virtual Tipos_Equipo? Tipo_equipo { get; set; }
}
