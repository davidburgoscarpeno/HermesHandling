using Microsoft.AspNetCore.Mvc;
using HermesHandling.Data.Models;

namespace HermesHandling.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserCommonController : Controller
    {
        private readonly IEquipoRepository _equipoRepository;
        private readonly IReporte _reporteRepository;
        private readonly IDefectosReportadoRepository _defectoRepo;
        private readonly IReportesDocumentoRepository _documentoRepo;
        private readonly ITiposDefectoRepository _tiposDefectoRepo;


        public UserCommonController(
            IEquipoRepository equipoRepository,
            IReporte reporteRepository,
            IDefectosReportadoRepository defectoRepo,
            IReportesDocumentoRepository documentoRepo,
            ITiposDefectoRepository tiposDefectoRepo
            )
        {
            _equipoRepository = equipoRepository;
            _reporteRepository = reporteRepository;
            _defectoRepo = defectoRepo;
            _documentoRepo = documentoRepo;
            _tiposDefectoRepo = tiposDefectoRepo;
        }

        [HttpGet("equipos")]
        public async Task<IActionResult> GetEquipos()
        {
            var equipos = await _equipoRepository.GetAllAsync();
            return Ok(equipos);
        }

        [HttpGet("tipos-defectos")]
        public async Task<IActionResult> GetTiposDefecto()
        {
            var equipos = await _tiposDefectoRepo.GetAllAsync();
            return Ok(equipos);
        }


        #region Reportes
        [HttpPost("crear-reporte")]
        public async Task<IActionResult> CrearReporte([FromForm] CrearReporteViewModel model)
        {
            try
            {
                var reporte = new Reporte
                {
                    EquipoId = model.EquipoId,
                    UsuarioId = model.UsuarioId,
                    Ubicacion = model.Ubicacion,
                    Observaciones = model.Observaciones,
                    FechaCreacion = DateTime.Now,
                    Activo = true
                };
                await _reporteRepository.AddAsync(reporte);

                if (model.TipoDefectoId > 0)
                {
                    var defecto = new DefectosReportado
                    {
                        ReporteId = reporte.Id,
                        TipoDefectoId = model.TipoDefectoId,
                        FechaAlta = DateTime.Now,
                        FechaResolucion = null,
                        Resuelto = false
                    };
                    await _defectoRepo.AddAsync(defecto);
                }


                if (model.Documentos != null)
                {
                    foreach (var archivo in model.Documentos)
                    {
                        if (archivo.Length > 0)
                        {
                            var nombreArchivo = Path.GetFileName(archivo.FileName);
                            var ruta = Path.Combine("C:\\Users\\David\\Desktop\\HermesHandling\\HermesHandling\\FicherosOcultosWeb\\DocumentosReportes", nombreArchivo);
                            using (var stream = new FileStream(ruta, FileMode.Create))
                            {
                                await archivo.CopyToAsync(stream);
                            }
                            var doc = new ReportesDocumento
                            {
                                ReporteId = reporte.Id,
                                Nombre = nombreArchivo,
                                PathDocumento = ruta,
                                Activo = true,
                                FechaSubida = DateTime.Now
                            };
                            await _documentoRepo.AddAsync(doc);
                        }
                    }
                }

                return Ok(new { message = "Reporte creado correctamente." });
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message ?? "";
                return StatusCode(500, $"Error interno: {ex.Message} {inner}");
                Console.WriteLine(inner);
            }
           
        }

        #endregion
    }
}
