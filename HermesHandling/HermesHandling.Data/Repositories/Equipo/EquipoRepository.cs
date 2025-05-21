using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class EquipoRepository : IEquipoRepository
{
    private readonly HermesDbContext _context;
    public EquipoRepository(HermesDbContext context) { _context = context; }

    public async Task<IEnumerable<Equipo>> GetAllAsync()
    {
        return await _context.Equipos.ToListAsync();
    }

    public async Task<Equipo?> GetByIdAsync(int id)
    {
        return await _context.Equipos.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<(bool Success, string Message)> UpdateAsync(Equipo equipo)
    {
        var existing = await _context.Equipos.FindAsync(equipo.Id);
        if (existing == null)
            return (false, "No se encontró el equipo.");

        existing.AssetId = equipo.AssetId;
        existing.Nombre = equipo.Nombre;
        existing.Descripcion = equipo.Descripcion;
        existing.TipoEquipoId = equipo.TipoEquipoId;
        existing.Estado = equipo.Estado;

        await _context.SaveChangesAsync();
        return (true, "Equipo actualizado correctamente.");
    }
}
