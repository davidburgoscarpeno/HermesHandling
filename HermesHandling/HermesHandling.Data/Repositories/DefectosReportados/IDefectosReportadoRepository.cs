using HermesHandling.Data.Models;

public interface IDefectosReportadoRepository
{
    Task AddAsync(DefectosReportado defecto);
    // Puedes añadir más métodos según tus necesidades
    Task<(bool Success, string Message)> UpdateAsync(int id);

}
