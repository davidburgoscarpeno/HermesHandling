using HermesHandling.Data.Models;

public interface ITiposDefectoRepository
{
    Task<IEnumerable<TiposDefecto>> GetAllAsync();
    Task<TiposDefecto?> GetByIdAsync(int id);
}
