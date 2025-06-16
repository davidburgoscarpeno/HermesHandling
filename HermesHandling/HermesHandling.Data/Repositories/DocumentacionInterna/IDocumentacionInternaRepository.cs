using HermesHandling.Data.Models;

public interface IDocumentacionInternaRepository
{
    Task AddAsync(DocumentacionInterna documentacion);
    Task<IEnumerable<DocumentacionInterna>> GetAllAsync();
    Task<DocumentacionInterna?> GetByIdAsync(int id);
    Task<(bool Success, string Message)> UpdateAsync(DocumentacionInterna documentacion);
    Task<(bool Success, string Message)> DeleteAsync(int id);

}
