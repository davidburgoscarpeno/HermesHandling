using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class TiposDefectoRepository : ITiposDefectoRepository
{
    private readonly HermesDbContext _context;
    public TiposDefectoRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TiposDefecto>> GetAllAsync()
    {
        return await _context.TiposDefectos.ToListAsync();
    }

    public async Task<TiposDefecto?> GetByIdAsync(int id)
    {
        return await _context.TiposDefectos.FindAsync(id);
    }
}
