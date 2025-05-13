using HermesHandling.Data.Models;

namespace HermesHandling.Server.Repositories.HistorialIncidenciasRepositories
{
    public class HistorialIncidenciasRepository : IHistorialIncidencias
    {
        private readonly HermesDbContext _hermesDbContext;

        public HistorialIncidenciasRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }
    }
}
