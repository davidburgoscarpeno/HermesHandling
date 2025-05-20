using HermesHandling.Data.Models;

public interface IDefectosReportadoRepository
{
    Task AddAsync(DefectosReportado defecto);
    // Puedes a�adir m�s m�todos seg�n tus necesidades
    Task<(bool Success, string Message)> UpdateAsync(int id);

}
