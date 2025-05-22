// En HermesHandling.Server/Repositories/IComunicacionesRepository.cs
using HermesHandling.Data.Models;

public interface IComunicacionesRepository
{
    Task AddAsync(Comunicacione comunicacion);
    Task<IEnumerable<Comunicacione>> GetAllAsync();
    Task<IEnumerable<Comunicacione>> GetAllAsyncUser();

    Task<Comunicacione?> GetByIdAsync(int id);
    Task<(bool Success, string Message)> UpdateAsync(int id, Comunicacione model);
    Task<(bool Success, string Message)> DeleteAsync(int id);
}
