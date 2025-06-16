// En HermesHandling.Server/Repositories/DocumentacionInterna/DocumentacionInternaRepository.cs
using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

public class DocumentacionInternaRepository : IDocumentacionInternaRepository
{
    private readonly HermesDbContext _context;
    public DocumentacionInternaRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(DocumentacionInterna documentacion)
    {
        _context.DocumentacionInternas.Add(documentacion);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<DocumentacionInterna>> GetAllAsync()
    {
        return await _context.DocumentacionInternas.ToListAsync();
    }

    public async Task<DocumentacionInterna?> GetByIdAsync(int id)
    {
        return await _context.DocumentacionInternas.FindAsync(id);
    }

    public async Task<(bool Success, string Message)> UpdateAsync(DocumentacionInterna documentacion)
    {
        var doc = await _context.DocumentacionInternas.FindAsync(documentacion.Id);
        if (doc == null)
            return (false, "No se encontró la documentación interna.");

        doc.Nombre = documentacion.Nombre;
        doc.FechaModificacion = DateTime.Now;
        // Aquí puedes actualizar otros campos si es necesario

        _context.DocumentacionInternas.Update(doc);
        await _context.SaveChangesAsync();
        return (true, "");
    }


    public async Task<(bool Success, string Message)> DeleteAsync(int id)
    {
        var doc = await _context.DocumentacionInternas.FindAsync(id);
        if (doc == null)
            return (false, "No se encontró la documentación interna.");

        _context.DocumentacionInternas.Remove(doc);
        await _context.SaveChangesAsync();
        return (true, "");
    }
}
