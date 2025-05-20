using HermesHandling.Data.Models;

public class ReportesDocumentoRepository : IReportesDocumentoRepository
{
    private readonly HermesDbContext _context;
    public ReportesDocumentoRepository(HermesDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(ReportesDocumento documento)
    {
        _context.ReportesDocumentos.Add(documento);
        await _context.SaveChangesAsync();
    }
}
