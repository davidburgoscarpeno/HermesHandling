using HermesHandling.Data.Models;

public interface IEquipoRepository
{
    Task<IEnumerable<Equipo>> GetAllAsync();
}
