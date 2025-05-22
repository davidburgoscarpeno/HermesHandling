using HermesHandling.Data.Models;

public interface IEquipoRepository
{
    Task<IEnumerable<Equipo>> GetAllAsync();
    Task<Equipo?> GetByIdAsync(int id);
    Task<(bool Success, string Message)> UpdateAsync(Equipo equipo);
    Task AddAsync(Equipo equipo);
    Task<IEnumerable<Equipo>> GetEquiposAsync(string? search);



}
