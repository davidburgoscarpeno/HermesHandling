using HermesHandling.Data.Models;

public interface ITiposEquipoRepository
{
    Task<IEnumerable<TiposEquipo>> GetAllAsync();
    Task<TiposEquipo?> GetByIdAsync(int id);
    // Puedes añadir más métodos CRUD si lo necesitas
}
