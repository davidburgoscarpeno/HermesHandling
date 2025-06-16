// En HermesHandling.Server/Repositories/ComunicacionesRepository.cs
using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class ComunicacionesRepository : IComunicacionesRepository
{
    private readonly HermesDbContext _context;
    public ComunicacionesRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Comunicacione comunicacion)
    {
        _context.Comunicaciones.Add(comunicacion);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Comunicacione>> GetAllAsync()
    {
        return await _context.Comunicaciones.OrderByDescending(c => c.FechaPublicacion).ToListAsync();
    }

    public async Task<IEnumerable<Comunicacione>> GetAllAsyncUser()
    {
        return await _context.Comunicaciones.OrderByDescending(c => c.FechaPublicacion).ToListAsync();
    }

    public async Task<Comunicacione?> GetByIdAsync(int id)
    {
        return await _context.Comunicaciones.FindAsync(id);
    }

    public async Task<(bool Success, string Message)> UpdateAsync(int id, Comunicacione model)
    {
        var com = await _context.Comunicaciones.FindAsync(id);
        if (com == null)
            return (false, "No se encontró la comunicación.");

        com.Asunto = model.Asunto;
        com.Mensaje = model.Mensaje;
        com.FechaPublicacion = model.FechaPublicacion ?? com.FechaPublicacion;
        com.FechaModificacion = DateTime.Now;
        com.IdUsuarioModificacion = model.IdUsuarioModificacion;

        _context.Comunicaciones.Update(com);
        await _context.SaveChangesAsync();
        return (true, "");
    }

    public async Task<(bool Success, string Message)> DeleteAsync(int id)
    {
        var com = await _context.Comunicaciones.FindAsync(id);
        if (com == null)
            return (false, "No se encontró la comunicación.");

        _context.Comunicaciones.Remove(com);
        await _context.SaveChangesAsync();
        return (true, "");
    }
}
