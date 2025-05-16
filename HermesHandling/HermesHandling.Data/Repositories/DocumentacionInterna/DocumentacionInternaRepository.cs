using EjemploCifrado.Helper;
using HermesHandling.Data.Models;
using HermesHandling.Server.Models.Usuarios;

namespace HermesHandling.Server.Repositories.DocumentacionInterna
{

   
    public class DocumentacionInternaRepository
    {
        private readonly HermesDbContext _hermesDbContext;

        public DocumentacionInternaRepository(HermesDbContext hermesDbContext)
        {
            _hermesDbContext = hermesDbContext;
        }


        public bool DeleteDocumentacion(int id)
        {
            var documentacion = _hermesDbContext.DocumentacionInternas.FirstOrDefault(u => u.Id == id);
            if (documentacion == null)
                return false;

            try
            {
                _hermesDbContext.DocumentacionInternas.Remove(documentacion);
                _hermesDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al eliminar documentacion: {ex.Message}");
                return false;
            }
        }

        
    }
}
