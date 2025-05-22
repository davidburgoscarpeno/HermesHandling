using Microsoft.AspNetCore.Mvc;
using HermesHandling.Data.Models;
using Microsoft.EntityFrameworkCore;

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
        private readonly HermesDbContext _db;
        private readonly IWebHostEnvironment _env;
        private readonly IComunicacionesRepository _comRepo;

        public UserCommonController(
            IEquipoRepository equipoRepository,
            IReporte reporteRepository,
            IDefectosReportadoRepository defectoRepo,
            IReportesDocumentoRepository documentoRepo,
            ITiposDefectoRepository tiposDefectoRepo,
            HermesDbContext db,
            IWebHostEnvironment env,
            IComunicacionesRepository comRepo
            )
        {
            _equipoRepository = equipoRepository;
            _reporteRepository = reporteRepository;
            _defectoRepo = defectoRepo;
            _documentoRepo = documentoRepo;
            _tiposDefectoRepo = tiposDefectoRepo;
            _db = db;
            _env = env;
            _comRepo = comRepo;

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

        [HttpGet("reportes-usuario/{idUsuario}")]
        public async Task<IActionResult> GetReportesUsuario(int idUsuario)
        {
            var todos = await _reporteRepository.GetAllAsync(); 
            var reportesUsuario = todos
                .Where(r => r.UsuarioId == idUsuario)
                .Select(r => new {
                    id = r.Id,
                    equipoId = r.EquipoId,
                    assetIdEquipo = r.Equipo != null ? r.Equipo.AssetId : null,
                    fechaCreacion = r.FechaCreacion,
                    observaciones = r.Observaciones,
                    activo = r.Activo
                })
                .ToList();

            return Ok(reportesUsuario);
        }

        #region Documentacion Interna
        [HttpGet("descargar-documento-interno")]
        public async Task<IActionResult> DescargarDocumentoInterno(int id)
        {
            var doc = await _db.DocumentacionInternas.FirstOrDefaultAsync(d => d.Id == id);
            if (doc == null)
                return NotFound("No existe el documento en la base de datos.");
            if (string.IsNullOrEmpty(doc.PathDocumento))
                return NotFound("El campo PathDocumento está vacío.");

            var fileName = Path.GetFileName(doc.PathDocumento);
            var parentPath = Directory.GetParent(_env.ContentRootPath).FullName;
            var filePath = Path.Combine(parentPath, "FicherosOcultosWeb", "DocumentacionInterna", fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound($"No se encontró el archivo físico en: {filePath}");

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/pdf", fileName);
        }



        #endregion


        #endregion


        #region Comunicados

        [HttpGet("listar-comunicaciones")]
        public async Task<IActionResult> ListarComunicaciones()
        {
            var comunicaciones = await _comRepo.GetAllAsyncUser();
            return Ok(comunicaciones);
        }

        #endregion
    }
}
