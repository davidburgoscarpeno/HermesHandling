using HermesHandling.Server.Models.Context;

namespace HermesHandling.Server.Repositories.EquiposRepositories
{
    public class HistorialIncidenciasRepository : IEquipo
    {
        private readonly HermesDbContext _hermesDbContext;

        public HistorialIncidenciasRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }
    }
}
