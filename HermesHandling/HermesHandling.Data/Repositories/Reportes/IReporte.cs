// IReporte.cs
using HermesHandling.Data.Models;

public interface IReporte
{
    List<Reporte> GetReportes();
    Task AddAsync(Reporte reporte);
    Task<(bool Success, string Message)> DeleteAsync(int id);
    Reporte GetReporte(int id);
    Task<(bool Success, string Message)> UpdateAsync(Reporte reporte);

    Task<IEnumerable<Reporte>> GetAllAsync();


}
