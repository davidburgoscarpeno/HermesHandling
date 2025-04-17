using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Models;

public partial class HermesDbContext : DbContext
{
    public HermesDbContext()
    {
    }

    public HermesDbContext(DbContextOptions<HermesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Compania> Companias { get; set; }

    public virtual DbSet<ConfigurationKey> ConfigurationKeys { get; set; }

    public virtual DbSet<Equipo> Equipos { get; set; }

    public virtual DbSet<HistorialIncidencia> HistorialIncidencias { get; set; }

    public virtual DbSet<Incidencia> Incidencias { get; set; }

    public virtual DbSet<Mantenimiento> Mantenimientos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    #region ConfiguracionEntity
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Compania>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__compania__3213E83FAC57B8BA");

            entity.ToTable("companias");

            entity.HasIndex(e => e.Nombre, "UQ__compania__72AFBCC67DC372DB").IsUnique();

            entity.HasIndex(e => e.CodigoIcao, "UQ__compania__8F6B95982CF76666").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activa)
                .HasDefaultValue(true)
                .HasColumnName("activa");
            entity.Property(e => e.CodigoIcao)
                .HasMaxLength(4)
                .IsUnicode(false)
                .HasColumnName("codigo_icao");
            entity.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Pais)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("pais");
        });

        modelBuilder.Entity<ConfigurationKey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Configur__3213E83F1E5DA645");

            entity.HasIndex(e => e.Clave, "UQ__Configur__71DCA3DB5A040AD2").IsUnique();

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

        modelBuilder.Entity<Equipo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__equipos__3213E83FA945819B");

            entity.ToTable("equipos");

            entity.Property(e => e.Id).HasColumnName("id");
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
        });

        modelBuilder.Entity<HistorialIncidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__historia__3213E83F294DCF02");

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
                .HasConstraintName("FK__historial__incid__66603565");

            entity.HasOne(d => d.Usuario).WithMany(p => p.HistorialIncidencia)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__historial__usuar__6754599E");
        });

        modelBuilder.Entity<Incidencia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__incidenc__3213E83FB5C70A36");

            entity.ToTable("incidencias");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AltaId).HasColumnName("alta_id");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
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
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__incidenci__alta___6477ECF3");

            entity.HasOne(d => d.Modificacion).WithMany(p => p.IncidenciaModificacions)
                .HasForeignKey(d => d.ModificacionId)
                .HasConstraintName("FK__incidenci__modif__656C112C");
        });

        modelBuilder.Entity<Mantenimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__mantenim__3213E83F25639924");

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
                .HasConstraintName("FK__mantenimi__equip__68487DD7");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Mantenimientos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__mantenimi__usuar__693CA210");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__usuarios__3213E83F398390ED");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Email, "UQ__usuarios__AB6E616404D5919E").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.CompaniaId).HasColumnName("compania_id");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsUnicode(false)
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
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Salt)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("salt");
            entity.Property(e => e.TipoUsuario).HasColumnName("tipo_usuario");
            entity.Property(e => e.UltimaSesion)
                .HasColumnType("datetime")
                .HasColumnName("ultima_sesion");

            entity.HasOne(d => d.Compania).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.CompaniaId)
                .HasConstraintName("FK__usuarios__compan__6383C8BA");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    #endregion
}
