using HermesHandling.Server.Models.Usuarios;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HermesHandling.Server.Models.Reportes
{
    public partial class Reportes_Documento
    {
        [Key]
        public int Id { get; set; }

        public int? Reporte_id { get; set; }

        [StringLength(255)]
        [Unicode(false)]
        public string? Nombre { get; set; }

        [StringLength(255)]
        [Unicode(false)]
        public string? Path_documento { get; set; }

        [StringLength(50)]
        [Unicode(false)]
        public string? Tipo_documento { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? Fecha_subida { get; set; }

        public int? Usuario_id { get; set; }

        public bool? Activo { get; set; }

        [ForeignKey("Reporte_id")]
        public virtual Reporte? Reporte { get; set; }

        // Aquí cambiamos Reporte? por Usuario?
        [ForeignKey("Usuario_id")]
        public virtual Usuario? Usuario { get; set; }  // Cambiado de Reporte a Usuario
    }
}
