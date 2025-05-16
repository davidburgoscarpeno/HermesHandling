using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Data.Models;

public partial class HermesDbContext : DbContext
{
    public HermesDbContext()
    {
    }

    public HermesDbContext(DbContextOptions<HermesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CategoriasEquipo> CategoriasEquipos { get; set; }

    public virtual DbSet<Comunicacione> Comunicaciones { get; set; }

    public virtual DbSet<ConfigurationKey> ConfigurationKeys { get; set; }

    public virtual DbSet<DefectosReportado> DefectosReportados { get; set; }

    public virtual DbSet<DocumentacionInterna> DocumentacionInternas { get; set; }

    public virtual DbSet<Equipo> Equipos { get; set; }

    public virtual DbSet<HistorialIncidencia> HistorialIncidencias { get; set; }

    public virtual DbSet<Incidencia> Incidencias { get; set; }

    public virtual DbSet<Mantenimiento> Mantenimientos { get; set; }

    public virtual DbSet<Reporte> Reportes { get; set; }

    public virtual DbSet<ReportesDocumento> ReportesDocumentos { get; set; }

    public virtual DbSet<TiposDefecto> TiposDefectos { get; set; }

    public virtual DbSet<TiposEquipo> TiposEquipos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=HermesHandling;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CategoriasEquipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__categori__3213E83F25E0BF1A");

            entity.ToTable("categorias_equipos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Comunicacione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__comunica__3213E83F8A86778A");

            entity.ToTable("comunicaciones");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Asunto)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("asunto");
            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_alta");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.FechaPublicacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_publicacion");
            entity.Property(e => e.IdUsuarioAlta).HasColumnName("id_usuario_alta");
            entity.Property(e => e.IdUsuarioModificacion).HasColumnName("id_usuario_modificacion");
            entity.Property(e => e.Mensaje)
                .HasColumnType("text")
                .HasColumnName("mensaje");
     
            entity.HasOne(d => d.IdUsuarioAltaNavigation).WithMany(p => p.ComunicacioneIdUsuarioAltaNavigations)
                .HasForeignKey(d => d.IdUsuarioAlta)
                .HasConstraintName("FK__comunicac__id_us__1F98B2C1");

            entity.HasOne(d => d.IdUsuarioModificacionNavigation).WithMany(p => p.ComunicacioneIdUsuarioModificacionNavigations)
                .HasForeignKey(d => d.IdUsuarioModificacion)
                .HasConstraintName("FK__comunicac__id_us__208CD6FA");
        });

        modelBuilder.Entity<ConfigurationKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Configur__3213E83F375EE2AA");

            entity.HasIndex(e => e.Clave, "UQ__Configur__71DCA3DB6D1DCDDA").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activa)
                .HasDefaultValue(true)
                .HasColumnName("activa");
            entity.Property(e => e.Clave)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("clave");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo");
            entity.Property(e => e.Valor)
                .HasColumnType("text")
                .HasColumnName("valor");
        });

        modelBuilder.Entity<DefectosReportado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__defectos__3213E83F86795D7A");

            entity.ToTable("defectos_reportados");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ReporteId).HasColumnName("reporte_id");
            entity.Property(e => e.TipoDefectoId).HasColumnName("tipo_defecto_id");

            entity.HasOne(d => d.Reporte).WithMany(p => p.DefectosReportados)
                .HasForeignKey(d => d.ReporteId)
                .HasConstraintName("FK__defectos___repor__1BC821DD");

            entity.HasOne(d => d.TipoDefecto).WithMany(p => p.DefectosReportados)
                .HasForeignKey(d => d.TipoDefectoId)
                .HasConstraintName("FK__defectos___tipo___1CBC4616");
        });

        modelBuilder.Entity<DocumentacionInterna>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__document__3213E83F7E489B45");

            entity.ToTable("documentacion_interna");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_alta");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.IdUsuarioAlta).HasColumnName("id_usuario_alta");
            entity.Property(e => e.IdUsuarioModificacion).HasColumnName("id_usuario_modificacion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.PathDocumento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("path_documento");

            entity.HasOne(d => d.IdUsuarioAltaNavigation).WithMany(p => p.DocumentacionInternaIdUsuarioAltaNavigations)
                .HasForeignKey(d => d.IdUsuarioAlta)
                .HasConstraintName("FK__documenta__id_us__2180FB33");

            entity.HasOne(d => d.IdUsuarioModificacionNavigation).WithMany(p => p.DocumentacionInternaIdUsuarioModificacionNavigations)
                .HasForeignKey(d => d.IdUsuarioModificacion)
                .HasConstraintName("FK__documenta__id_us__22751F6C");
        });

        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__equipos__3213E83F93FB54E8");

            entity.ToTable("equipos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AssetId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("asset_id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("estado");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaUltimaRevision)
                .HasColumnType("datetime")
                .HasColumnName("fecha_ultima_revision");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.TipoEquipoId).HasColumnName("tipo_equipo_id");

            entity.HasOne(d => d.TipoEquipo).WithMany(p => p.Equipos)
                .HasForeignKey(d => d.TipoEquipoId)
                .HasConstraintName("FK__equipos__tipo_eq__1332DBDC");
        });

        modelBuilder.Entity<HistorialIncidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__historia__3213E83F27D8813B");

            entity.ToTable("historial_incidencias");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Accion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("accion");
            entity.Property(e => e.Comentario)
                .HasColumnType("text")
                .HasColumnName("comentario");
            entity.Property(e => e.FechaAccion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_accion");
            entity.Property(e => e.IncidenciaId).HasColumnName("incidencia_id");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Incidencia).WithMany(p => p.HistorialIncidencia)
                .HasForeignKey(d => d.IncidenciaId)
                .HasConstraintName("FK__historial__incid__17F790F9");

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistorialIncidencia)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__historial__usuar__18EBB532");
        });

        modelBuilder.Entity<Incidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__incidenc__3213E83F0F5CD9F0");

            entity.ToTable("incidencias");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AltaId).HasColumnName("alta_id");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("abierta")
                .HasColumnName("estado");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.ModificacionId).HasColumnName("modificacion_id");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("media")
                .HasColumnName("prioridad");
            entity.Property(e => e.Titulo)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.Alta).WithMany(p => p.IncidenciaAlta)
                .HasForeignKey(d => d.AltaId)
                .HasConstraintName("FK__incidenci__alta___160F4887");

            entity.HasOne(d => d.Modificacion).WithMany(p => p.IncidenciaModificacions)
                .HasForeignKey(d => d.ModificacionId)
                .HasConstraintName("FK__incidenci__modif__17036CC0");
        });

        modelBuilder.Entity<Mantenimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__mantenim__3213E83F389B9D12");

            entity.ToTable("mantenimientos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.EquipoId).HasColumnName("equipo_id");
            entity.Property(e => e.FechaMantenimiento)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_mantenimiento");
            entity.Property(e => e.TipoMantenimiento)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("tipo_mantenimiento");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Equipo).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.EquipoId)
                .HasConstraintName("FK__mantenimi__equip__14270015");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__mantenimi__usuar__151B244E");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reportes__3213E83F014DB27C");

            entity.ToTable("reportes");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EquipoId).HasColumnName("equipo_id");
            entity.Property(e => e.FechaCreacion)
                .HasPrecision(3)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.Observaciones)
                .HasColumnType("text")
                .HasColumnName("observaciones");
            entity.Property(e => e.Ubicacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ubicacion");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Equipo).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.EquipoId)
                .HasConstraintName("FK__reportes__equipo__19DFD96B");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__reportes__usuari__1AD3FDA4");
        });

        modelBuilder.Entity<ReportesDocumento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reportes__3213E83F877A5DEA");

            entity.ToTable("reportes_documentos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.FechaSubida)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_subida");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.PathDocumento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("path_documento");
            entity.Property(e => e.ReporteId).HasColumnName("reporte_id");
            entity.Property(e => e.TipoDocumento)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo_documento");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Reporte).WithMany(p => p.ReportesDocumentos)
                .HasForeignKey(d => d.ReporteId)
                .HasConstraintName("FK__reportes___repor__1DB06A4F");

            entity.HasOne(d => d.Usuario).WithMany(p => p.ReportesDocumentos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__reportes___usuar__1EA48E88");
        });

        modelBuilder.Entity<TiposDefecto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_de__3213E83FB8BB96B0");

            entity.ToTable("tipos_defectos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TiposEquipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_eq__3213E83FEA5D86A4");

            entity.ToTable("tipos_equipos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoriaEquipoId).HasColumnName("categoria_equipo_id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");

            entity.HasOne(d => d.CategoriaEquipo).WithMany(p => p.TiposEquipos)
                .HasForeignKey(d => d.CategoriaEquipoId)
                .HasConstraintName("FK__tipos_equ__categ__123EB7A3");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__usuarios__3213E83FA568ADBD");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Email, "UQ_usuarios_email").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .HasColumnName("apellido");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .HasColumnName("email");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.FechaModificacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_modificacion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Password)
                .HasMaxLength(512)
                .HasColumnName("password");
            entity.Property(e => e.Salt)
                .HasMaxLength(100)
                .HasColumnName("salt");
            entity.Property(e => e.TipoUsuario).HasColumnName("tipo_usuario");
            entity.Property(e => e.UltimaSesion)
                .HasColumnType("datetime")
                .HasColumnName("ultima_sesion");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
