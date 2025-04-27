using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HermesHandling.Server.Models
{
    public partial class Mantenimiento
    {
        [Key]
        public int Id { get; set; }

        public int? Equipo_id { get; set; }

        [StringLength(100)]
        [Unicode(false)]
        public string? Tipo_mantenimiento { get; set; }

        [Column(TypeName = "text")]
        public string? Descripcion { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? Fecha_mantenimiento { get; set; }

        public int? Usuario_id { get; set; }

        [ForeignKey("equipo_id")]
        public virtual Equipo? Equipo { get; set; }

        [ForeignKey("usuario_id")]
        public virtual Usuario? Usuario { get; set; }
    }
}
