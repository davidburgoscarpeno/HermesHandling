using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class DefectosReportadoRepository : IDefectosReportadoRepository
{
    private readonly HermesDbContext _context;
    public DefectosReportadoRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(DefectosReportado defecto)
    {
        _context.DefectosReportados.Add(defecto);
        await _context.SaveChangesAsync();
    }

    public async Task<(bool Success, string Message)> UpdateAsync(int idReporte)
    {
        var defectos = await _context.DefectosReportados
            .Where(d => d.ReporteId == idReporte)
            .ToListAsync();

        if (defectos == null || defectos.Count == 0)
            return (false, "No se encontraron defectos reportados para este reporte.");

        foreach (var defecto in defectos)
        {
            defecto.FechaResolucion = DateTime.Now;
            defecto.Resuelto = true;
        }

        await _context.SaveChangesAsync();
        return (true, "");
    }






}
