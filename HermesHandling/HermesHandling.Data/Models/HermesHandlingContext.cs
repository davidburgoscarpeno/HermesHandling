using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Data.Models;

public partial class HermesHandlingContext : DbContext
{
    public HermesHandlingContext()
    {
    }

    public HermesHandlingContext(DbContextOptions<HermesHandlingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<RegistroLogin> RegistroLogins { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=HermesHandling;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RegistroLogin>(entity =>
        {
            entity.ToTable("registro_login");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
