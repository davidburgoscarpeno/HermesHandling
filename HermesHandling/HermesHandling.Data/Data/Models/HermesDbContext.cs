using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Data.Data.Models;

public partial class HermesDbContext : DbContext
{
    public HermesDbContext()
    {
    }

    public HermesDbContext(DbContextOptions<HermesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Equipo> Equipos { get; set; }

    public virtual DbSet<EquiposReportesHistorial> EquiposReportesHistorials { get; set; }

    public virtual DbSet<Reporte> Reportes { get; set; }

    public virtual DbSet<TiposEquipo> TiposEquipos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=HermesHandling;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__equipos__3213E83FA08444CD");

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
                .HasConstraintName("FK__equipos__tipo_eq__693CA210");
        });

        modelBuilder.Entity<EquiposReportesHistorial>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__equipos___3214EC07F68603D6");

            entity.ToTable("equipos_reportes_historial");

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Descripcion).HasMaxLength(500);
            entity.Property(e => e.FechaIncidente).HasColumnType("datetime");
            entity.Property(e => e.TipoIncidente).HasMaxLength(100);

            entity.HasOne(d => d.Equipo).WithMany(p => p.EquiposReportesHistorials)
                .HasForeignKey(d => d.EquipoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EquiposReportesHistorial_Equipo");

            entity.HasOne(d => d.Reporte).WithMany(p => p.EquiposReportesHistorials)
                .HasForeignKey(d => d.ReporteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EquiposReportesHistorial_Reporte");

            entity.HasOne(d => d.Usuario).WithMany(p => p.EquiposReportesHistorials)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EquiposReportesHistorial_Usuario");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reportes__3213E83F4867CF8D");

            entity.ToTable("reportes");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.EquipoId).HasColumnName("equipo_id");
            entity.Property(e => e.FechaCreacion)
                .HasPrecision(3)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.Observaciones)
                .HasColumnType("text")
                .HasColumnName("observaciones");
            entity.Property(e => e.ObservacionesResuelto).HasColumnName("observaciones_resuelto");
            entity.Property(e => e.Ubicacion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ubicacion");
            entity.Property(e => e.UsuarioId).HasColumnName("usuario_id");

            entity.HasOne(d => d.Equipo).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.EquipoId)
                .HasConstraintName("FK__reportes__equipo__6FE99F9F");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_reportes_usuarios");
        });

        modelBuilder.Entity<TiposEquipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tipos_eq__3213E83FB6ED09ED");

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
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__usuarios__3213E83FB60AAAE9");

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
