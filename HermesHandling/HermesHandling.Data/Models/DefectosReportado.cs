using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class DefectosReportado
{
    public int Id { get; set; }

    public int? ReporteId { get; set; }

    public int? TipoDefectoId { get; set; }

    public bool Resuelto { get; set; }

    public DateTime? FechaResolucion { get; set; }

    public DateTime FechaAlta { get; set; }

    public virtual Reporte? Reporte { get; set; }

    public virtual TiposDefecto? TipoDefecto { get; set; }
}
