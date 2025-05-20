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
}
