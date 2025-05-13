using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class HistorialIncidencia
{
    public int Id { get; set; }

    public int? IncidenciaId { get; set; }

    public int? UsuarioId { get; set; }

    public string? Accion { get; set; }

    public string? Comentario { get; set; }

    public DateTime? FechaAccion { get; set; }

    public virtual Incidencia? Incidencia { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
