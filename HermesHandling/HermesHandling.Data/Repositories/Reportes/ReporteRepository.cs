// ReporteRepository.cs
using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class ReporteRepository : IReporte
{
    private readonly HermesDbContext _context;
    public ReporteRepository(HermesDbContext context)
    {
        _context = context;
    }

    public List<Reporte> GetReportes()
    {
        return _context.Reportes.ToList();
    }

    public Reporte GetReporte(int id)
    {
        return _context.Reportes
             .Include(r => r.Equipo) // Para el asset del equipo
             .Include(r => r.DefectosReportados)
                 .ThenInclude(dr => dr.TipoDefecto) // Si quieres el nombre del defecto
             .Include(r => r.ReportesDocumentos) // Para los documentos asociados
             .FirstOrDefault(r => r.Id == id);
    }

    public async Task AddAsync(Reporte reporte)
    {
        _context.Reportes.Add(reporte);
        await _context.SaveChangesAsync();
    }


    public async Task<(bool Success, string Message)> DeleteAsync(int id)
    {
        var rep = await _context.Reportes.FindAsync(id);
        if (rep == null)
            return (false, "No se encontró el reporte.");

        _context.Reportes.Remove(rep);
        await _context.SaveChangesAsync();
        return (true, "");
    }

    public async Task<(bool Success, string Message)> UpdateAsync(Reporte reporte)
    {
        var existente = await _context.Reportes.FindAsync(reporte.Id);
        if (existente == null)
            return (false, "No se encontró el reporte.");

        // Actualiza solo los campos que pueden cambiar
        existente.Ubicacion = reporte.Ubicacion;
        existente.Observaciones = reporte.Observaciones;
        existente.ObservacionesResuelto = reporte.ObservacionesResuelto;
        existente.Activo = reporte.Activo;
        existente.FechaCreacion = reporte.FechaCreacion;
        existente.EquipoId = reporte.EquipoId;
        existente.UsuarioId = reporte.UsuarioId;

        await _context.SaveChangesAsync();
        return (true, "");
    }

}