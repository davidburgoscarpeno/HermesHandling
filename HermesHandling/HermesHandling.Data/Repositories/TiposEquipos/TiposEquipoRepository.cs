using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class TiposEquipoRepository : ITiposEquipoRepository
{
    private readonly HermesDbContext _context;

    public TiposEquipoRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TiposEquipo>> GetAllAsync()
    {
        return await _context.TiposEquipos.ToListAsync();
    }

    public async Task<TiposEquipo?> GetByIdAsync(int id)
    {
        return await _context.TiposEquipos.FindAsync(id);
    }
}
