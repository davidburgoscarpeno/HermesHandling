using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class Categorias_Equipo
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [StringLength(255)]
    [Unicode(false)]
    public string? Descripcion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_modificacion { get; set; }

    [InverseProperty("categoria_equipo")]
    public virtual ICollection<Tipos_Equipo> Tipos_equipos { get; set; } = new List<Tipos_Equipo>();
}
