using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HermesHandling.Server.Models.Reportes;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class tipos_defecto
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Nombre { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Descripcion { get; set; }

    public virtual ICollection<Defectos_Reportados> Defectos_reportados { get; set; } = new List<Defectos_Reportados>();
}
