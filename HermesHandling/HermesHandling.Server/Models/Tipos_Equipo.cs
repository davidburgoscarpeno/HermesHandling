using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class Tipos_Equipo
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string? Descripcion { get; set; }

    public int? Categoria_equipo_id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    [ForeignKey("categoria_equipo_id")]
    public virtual Categorias_Equipo? Categoria_equipo { get; set; }

    public virtual ICollection<Equipo> Equipos { get; set; } = new List<Equipo>();
}
