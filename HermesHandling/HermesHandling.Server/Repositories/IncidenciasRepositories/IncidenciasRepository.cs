using HermesHandling.Server.Models;

namespace HermesHandling.Server.Repositories.IncidenciasRepositories
{
    public class IncidenciasRepository : IIncidencia
    {
        private readonly HermesDbContext _hermesDbContext;

        public IncidenciasRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }
    }
}
