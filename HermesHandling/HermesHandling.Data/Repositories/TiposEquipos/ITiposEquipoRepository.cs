using HermesHandling.Data.Models;

public interface ITiposEquipoRepository
{
    Task<IEnumerable<TiposEquipo>> GetAllAsync();
    Task<TiposEquipo?> GetByIdAsync(int id);
    // Puedes a�adir m�s m�todos CRUD si lo necesitas
}
