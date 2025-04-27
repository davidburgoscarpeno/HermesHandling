using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models.Context;

public partial class HermesDbContext : DbContext
{
    public HermesDbContext()
    {
    }

    public HermesDbContext(DbContextOptions<HermesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ConfigurationKey> ConfigurationKeys { get; set; }
    public virtual DbSet<Categorias_Equipo> Categorias_equipos { get; set; }
    public virtual DbSet<Comunicaciones> Comunicaciones { get; set; }
    public virtual DbSet<Defectos_Reportados> Defectos_reportados { get; set; }
    public virtual DbSet<Documentacion_Interna> Documentacion_internas { get; set; }
    public virtual DbSet<Equipo> Equipos { get; set; }
    public virtual DbSet<Historial_Incidencia> Historial_incidencias { get; set; }
    public virtual DbSet<Incidencia> Incidencias { get; set; }
    public virtual DbSet<Mantenimiento> Mantenimientos { get; set; }
    public virtual DbSet<Reporte> Reportes { get; set; }
    public virtual DbSet<Reportes_Documento> Reportes_documentos { get; set; }
    public virtual DbSet<tipos_defecto> Tipos_defectos { get; set; }
    public virtual DbSet<Tipos_Equipo> Tipos_equipos { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=localhost;Database=HermesHandling;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ConfigurationKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Configur__3213E83F375EE2AA");
            entity.Property(e => e.Activa).HasDefaultValue(true);
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Categorias_Equipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__categori__3213E83F25E0BF1A");
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Comunicaciones>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__comunica__3213E83F8A86778A");
            entity.Property(e => e.Fecha_alta).HasDefaultValueSql("(getdate())");

            // Relaciones con Usuario
            entity.HasOne(d => d.Id_usuario_altaNavigation)
                .WithMany(p => p.Comunicacioneid_usuario_altaNavigations)
                .HasConstraintName("FK__comunicac__id_us__1F98B2C1");

            entity.HasOne(d => d.Id_usuario_modificacionNavigation)
                .WithMany(p => p.Comunicacioneid_usuario_modificacionNavigations)
                .HasConstraintName("FK__comunicac__id_us__208CD6FA");
        });

        modelBuilder.Entity<Defectos_Reportados>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__defectos__3213E83F86795D7A");
            entity.HasOne(d => d.Reporte).WithMany(p => p.Defectos_reportados).HasConstraintName("FK__defectos___repor__1BC821DD");
            entity.HasOne(d => d.Tipo_defecto).WithMany(p => p.Defectos_reportados).HasConstraintName("FK__defectos___tipo___1CBC4616");
        });

        modelBuilder.Entity<Documentacion_Interna>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__document__3213E83F7E489B45");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Fecha_alta).HasDefaultValueSql("(getdate())");

            // Relaciones con Usuario
            entity.HasOne(d => d.id_usuario_altaNavigation)
                .WithMany(p => p.Documentacion_internaid_usuario_altaNavigations)
                .HasConstraintName("FK__documenta__id_us__2180FB33");

            entity.HasOne(d => d.id_usuario_modificacionNavigation)
                .WithMany(p => p.Documentacion_internaid_usuario_modificacionNavigations)
                .HasConstraintName("FK__documenta__id_us__22751F6C");
        });

        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__equipos__3213E83F93FB54E8");
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
            entity.HasOne(d => d.Tipo_equipo).WithMany(p => p.Equipos).HasConstraintName("FK__equipos__tipo_eq__1332DBDC");
        });

        modelBuilder.Entity<Historial_Incidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__historia__3213E83F27D8813B");
            entity.Property(e => e.Fecha_accion).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Incidencia).WithMany(p => p.historial_incidencia).HasConstraintName("FK__historial__incid__17F790F9");
            entity.HasOne(d => d.Usuario).WithMany(p => p.Historial_incidencia).HasConstraintName("FK__historial__usuar__18EBB532");
        });

        modelBuilder.Entity<Incidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__incidenc__3213E83F0F5CD9F0");
            entity.Property(e => e.Estado).HasDefaultValue("abierta");
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Prioridad).HasDefaultValue("media");

            entity.HasOne(d => d.Alta).WithMany(p => p.Incidenciaalta).HasConstraintName("FK__incidenci__alta___160F4887");
            entity.HasOne(d => d.Modificacion).WithMany(p => p.Incidenciamodificacions).HasConstraintName("FK__incidenci__modif__17036CC0");
        });

        modelBuilder.Entity<Mantenimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__mantenim__3213E83F389B9D12");
            entity.Property(e => e.Fecha_mantenimiento).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Equipo).WithMany(p => p.Mantenimientos).HasConstraintName("FK__mantenimi__equip__14270015");
            entity.HasOne(d => d.Usuario).WithMany(p => p.Mantenimientos).HasConstraintName("FK__mantenimi__usuar__151B244E");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reportes__3213E83F014DB27C");
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Equipo).WithMany(p => p.Reportes).HasConstraintName("FK__reportes__equipo__19DFD96B");
            entity.HasOne(d => d.Usuario).WithMany(p => p.Reportes).HasConstraintName("FK__reportes__usuari__1AD3FDA4");
        });

        modelBuilder.Entity<Reportes_Documento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reportes__3213E83F877A5DEA");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Fecha_subida).HasDefaultValueSql("(getdate())");

            // Relación con Reporte
            entity.HasOne(d => d.Reporte)
                .WithMany(p => p.Reportes_documentos)
                .HasForeignKey(d => d.Reporte_id)
                .HasConstraintName("FK__reportes___repor__1DB06A4F");

            // Relación con Usuario (correctamente configurada)
            entity.HasOne(d => d.Usuario)
                .WithMany(p => p.Reportes_documentos)
                .HasForeignKey(d => d.Usuario_id)
                .HasConstraintName("FK__reportes___usuar__1EA48E88");
        });



        modelBuilder.Entity<tipos_defecto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_de__3213E83FB8BB96B0");
        });

        modelBuilder.Entity<Tipos_Equipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_eq__3213E83FEA5D86A4");
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
            entity.HasOne(d => d.Categoria_equipo).WithMany(p => p.Tipos_equipos).HasConstraintName("FK__tipos_equ__categ__123EB7A3");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__usuarios__3213E83FA568ADBD");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Fecha_creacion).HasDefaultValueSql("(getdate())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
