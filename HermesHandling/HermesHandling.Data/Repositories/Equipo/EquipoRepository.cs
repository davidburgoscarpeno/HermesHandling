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

    public async Task<IEnumerable<Equipo>> GetEquiposAsync(string? search)
    {
        var query = _context.Equipos.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var searchNorm = search.ToLower().Normalize(System.Text.NormalizationForm.FormD);
            query = query.Where(e =>
                e.AssetId != null &&
                EF.Functions.Like(
                    EF.Functions.Collate(e.AssetId, "Latin1_General_CI_AI"), // Sin tildes ni mayúsculas
                    $"%{search}%"
                )
            );
        }

        return await query.ToListAsync();
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

    public async Task AddAsync(Equipo equipo)
    {
        await _context.Equipos.AddAsync(equipo);
        await _context.SaveChangesAsync();
    }
}
