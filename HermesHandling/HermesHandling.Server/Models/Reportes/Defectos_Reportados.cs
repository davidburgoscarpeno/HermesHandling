using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models.Reportes;

public partial class Defectos_Reportados
{
    [Key]
    public int Id { get; set; }

    public int? Reporte_id { get; set; }

    public int? Tipo_defecto_id { get; set; }

    [ForeignKey("reporte_id")]
    public virtual Reporte? Reporte { get; set; }

    [ForeignKey("tipo_defecto_id")]
    public virtual tipos_defecto? Tipo_defecto { get; set; }
}
