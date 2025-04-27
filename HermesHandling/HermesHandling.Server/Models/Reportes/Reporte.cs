using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HermesHandling.Server.Models.Usuarios;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models.Reportes;

public partial class Reporte
{
    [Key]
    public int Id { get; set; }

    public int? Equipo_id { get; set; }

    public int? Usuario_id { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Ubicacion { get; set; }

    [Column(TypeName = "text")]
    public string? Observaciones { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_creacion { get; set; }

    public virtual ICollection<Defectos_Reportados> Defectos_reportados { get; set; } = new List<Defectos_Reportados>();

    [ForeignKey("equipo_id")]
    public virtual Equipo? Equipo { get; set; }

    public virtual ICollection<Reportes_Documento> Reportes_documentos { get; set; } = new List<Reportes_Documento>();

    [ForeignKey("usuario_id")]
    public virtual Usuario? Usuario { get; set; }
}
