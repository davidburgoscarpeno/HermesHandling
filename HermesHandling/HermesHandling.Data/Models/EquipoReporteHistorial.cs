using System;

namespace HermesHandling.Data.Models
{
    public partial class EquipoReporteHistorial
    {
        public int Id { get; set; }
        public int EquipoId { get; set; }
        public int ReporteId { get; set; }
        public int UsuarioId { get; set; }
        public string? Descripcion { get; set; }
        public DateTime FechaIncidente { get; set; }
        public string? TipoIncidente { get; set; }
        public bool Activo { get; set; }

        // Relaciones de navegación
        public virtual Equipo? Equipo { get; set; }
        public virtual Reporte? Reporte { get; set; }
        public virtual Usuario? Usuario { get; set; }
    }
}
