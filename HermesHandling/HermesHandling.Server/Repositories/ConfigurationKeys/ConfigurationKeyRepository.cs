using HermesHandling.Server.Models.Context;

namespace HermesHandling.Server.Repositories.ConfigurationKeysRepositories
{
    public class ConfigurationKeyRepository : IConfigurationKey
    {
        private readonly HermesDbContext _hermesDbContext;

        public ConfigurationKeyRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }
    }
}
