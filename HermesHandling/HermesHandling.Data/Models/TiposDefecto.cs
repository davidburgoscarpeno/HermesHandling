using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class TiposDefecto
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<DefectosReportado> DefectosReportados { get; set; } = new List<DefectosReportado>();
}
