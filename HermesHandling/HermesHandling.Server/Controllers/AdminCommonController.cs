using HermesHandling.Server.Models;
using HermesHandling.Data.Models;
using HermesHandling.Server.Models.DocumentacionInterna;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HermesHandling.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminCommonController : ControllerBase
    {
        private readonly IDocumentacionInternaRepository _docRepo;
        private readonly IComunicacionesRepository _comRepo;
        private readonly IReporte _reporteRepo;
        private readonly IDefectosReportadoRepository _defReportadoRepo;
        private readonly IEquipoRepository _equipoRepo;
        private readonly ITiposEquipoRepository _tiposEquipoRepo;
        private readonly HermesDbContext _context;





        public AdminCommonController(IDocumentacionInternaRepository docRepo, ITiposEquipoRepository tiposEquipoRepo,IEquipoRepository equipoRepo, IDefectosReportadoRepository defReportadoRepo, IReporte reporteRepo, IComunicacionesRepository comRepo)
        {
            _docRepo = docRepo;
            _comRepo = comRepo;
            _reporteRepo = reporteRepo;
            _defReportadoRepo = defReportadoRepo;
            _equipoRepo = equipoRepo;
            _tiposEquipoRepo = tiposEquipoRepo;


        }

        #region Documentacion Interna
        [HttpPost("crear-documentacion-interna")]
        public async Task<IActionResult> CrearDocumentacion([FromForm] DocumentacionInternaViewModel model)
        {
            if (model.Documento == null || model.Documento.Length == 0)
                return BadRequest("Debe seleccionar un archivo.");

            var allowedExtensions = new[] { ".pdf", ".docx" };
            var extension = Path.GetExtension(model.Documento.FileName).ToLower();
            if (!allowedExtensions.Contains(extension))
                return BadRequest("Solo se permiten archivos PDF o DOCX.");

            var path = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "FicherosOcultosWeb", "DocumentacionInterna");
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var safeFileName = model.Nombre.Replace(" ", "_") + extension;
            var filePath = Path.Combine(path, safeFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.Documento.CopyToAsync(stream);
            }

            var documentacion = new DocumentacionInterna
            {
                Nombre = model.Nombre,
                PathDocumento = filePath,
                FechaAlta = DateTime.Now,
                Activo = true,
                IdUsuarioAlta = model.IdAlta,
                IdUsuarioModificacion = null
            };

            await _docRepo.AddAsync(documentacion);

            return Ok(new { message = "Documento subido correctamente." });
        }


        [HttpGet("listar-documentacion-interna")]
        public async Task<IActionResult> ListarDocumentacionInternaApp()
        {
            var documentacion = await _docRepo.GetAllAsync();
            return Ok(documentacion);
        }

        [HttpPut("editar-documentacion/{id}")]
        public async Task<IActionResult> EditarDocumentacion(int id, [FromForm] DocumentacionInternaViewModel model)
        {
            var documentacion = await _docRepo.GetByIdAsync(id);
            if (documentacion == null)
                return NotFound("No se encontró la documentación interna con el ID proporcionado.");

            documentacion.Nombre = model.Nombre;
            documentacion.IdUsuarioModificacion = model.IdMod;

            if (model.Documento != null && model.Documento.Length > 0)
            {
                var allowedExtensions = new[] { ".pdf", ".docx" };
                var extension = Path.GetExtension(model.Documento.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Solo se permiten archivos PDF o DOCX.");

                var path = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "FicherosOcultosWeb", "DocumentacionInterna");
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                var safeFileName = model.Nombre.Replace(" ", "_") + extension;
                var filePath = Path.Combine(path, safeFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Documento.CopyToAsync(stream);
                }

                documentacion.PathDocumento = filePath;
            }

            var result = await _docRepo.UpdateAsync(documentacion);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Documentación interna actualizada correctamente." });
        }


        [HttpDelete("eliminar-documentacion/{id}")]
        public async Task<IActionResult> EliminarDocumentacion(int id)
        {
            var result = await _docRepo.DeleteAsync(id);
            if (!result.Success)
                return NotFound(result.Message);

            return Ok(new { message = "Documentación interna eliminada correctamente." });
        }

        [HttpGet("obtener-documentacion-interna/{id}")]
        public async Task<IActionResult> ObtenerDocumentacionInterna(int id)
        {
            var documentacion = await _docRepo.GetByIdAsync(id);
            if (documentacion == null)
                return NotFound("No se encontró la documentación interna con el ID proporcionado.");

            return Ok(new
            {
                documentacion.Nombre,
                documentacion.PathDocumento
            });
        }
        #endregion

        #region Comunicaciones

        [HttpGet("listar-comunicaciones")]
        public async Task<IActionResult> ListarComunicaciones()
        {
            var comunicaciones = await _comRepo.GetAllAsync();
            return Ok(comunicaciones);
        }

        [HttpGet("obtener-comunicacion/{id}")]
        public async Task<IActionResult> ObtenerComunicacion(int id)
        {
            var comunicacion = await _comRepo.GetByIdAsync(id);
            if (comunicacion == null)
                return NotFound("No se encontró la comunicación con el ID proporcionado.");

            return Ok(comunicacion);
        }

        [HttpPost("crear-comunicacion")]
        public async Task<IActionResult> CrearComunicacion([FromBody] Comunicacione comunicacion)
        {
            if (string.IsNullOrWhiteSpace(comunicacion.Asunto) || string.IsNullOrWhiteSpace(comunicacion.Mensaje))
                return BadRequest("El asunto y el mensaje son obligatorios.");

            comunicacion.FechaPublicacion = comunicacion.FechaPublicacion ?? DateTime.Now;
            comunicacion.FechaAlta = DateTime.Now;

            await _comRepo.AddAsync(comunicacion);

            return Ok(new { message = "Comunicación creada correctamente." });
        }

        [HttpPut("editar-comunicacion/{id}")]
        public async Task<IActionResult> EditarComunicacion(int id, [FromBody] EditarComunicacionDto dto)
        {
            var comunicacion = await _comRepo.GetByIdAsync(id);
            if (comunicacion == null)
                return NotFound("No se encontró la comunicación con el ID proporcionado.");

            comunicacion.Asunto = dto.Asunto;
            comunicacion.Mensaje = dto.Mensaje;
            if (dto.FechaPublicacion != null)
            {
                comunicacion.FechaPublicacion = dto.FechaPublicacion ?? comunicacion.FechaPublicacion;
            }
            comunicacion.IdUsuarioModificacion = dto.IdUsuarioModificacion;
            comunicacion.FechaModificacion = DateTime.Now;

            var result = await _comRepo.UpdateAsync(id, comunicacion);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Comunicación actualizada correctamente." });
        }


        [HttpDelete("eliminar-comunicacion/{id}")]
        public async Task<IActionResult> EliminarComunicacion(int id)
        {
            var result = await _comRepo.DeleteAsync(id);
            if (!result.Success)
                return NotFound(result.Message);

            return Ok(new { message = "Comunicación eliminada correctamente." });
        }
        #endregion

        #region Reportes
        [HttpGet("listar-reportes")]
        public IActionResult ListarReportesApp()
        {
            var reportes = _reporteRepo.GetReportes();
            return Ok(reportes);
        }

        [HttpGet("get-reporte/{id}")]
        public IActionResult GetReporte(int id)
        {
            var reporte = _reporteRepo.GetReporte(id);
            if (reporte == null)
                return NotFound();

            var dto = new ReporteDto
            {
                Id = reporte.Id,
                Ubicacion = reporte.Ubicacion,
                Observaciones = reporte.Observaciones,
                ObservacionesResuelto = reporte.ObservacionesResuelto,
                Activo = reporte.Activo,
                FechaCreacion = reporte.FechaCreacion,
                AssetIdEquipo = reporte.Equipo?.AssetId,
                DefectosReportados = reporte.DefectosReportados?.Select(d => d.TipoDefecto?.Nombre ?? d.TipoDefectoId.ToString()).ToList() ?? new List<string>(),
                Documentos = reporte.ReportesDocumentos?.Select(d => d.Nombre ?? d.PathDocumento).ToList() ?? new List<string>()
            };

            return Ok(dto);
        }


        [HttpPut("resolver-reporte/{id}")]
        public async Task<IActionResult> ResolverReporte(int id, [FromBody] ResolverReporteViewModel model)
        {
            var reporte = _reporteRepo.GetReporte(id);
            if (reporte == null)
                return NotFound("No se encontró el reporte.");

            reporte.ObservacionesResuelto = model.ObservacionesResuelto;
            reporte.Activo = false;

            await _defReportadoRepo.UpdateAsync(id);
          
        
            var result = await _reporteRepo.UpdateAsync(reporte);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(new { message = "Reporte resuelto correctamente." });
        }



        #endregion

        #region Equipos
        [HttpGet("equipos/{id}")]
        public async Task<IActionResult> ObtenerEquipo(int id)
        {
            var equipo = await _equipoRepo.GetByIdAsync(id);
            if (equipo == null)
                return NotFound("No se encontró el equipo con el ID proporcionado.");

            return Ok(equipo);
        }

        [HttpGet("tipos-equipo")]
        public async Task<IActionResult> ListarTiposEquipo()
        {
            var tipos = await _tiposEquipoRepo.GetAllAsync();
            return Ok(tipos);
        }

        [HttpPut("editar-equipo/{id}")]
        public async Task<IActionResult> EditarEquipo(int id, [FromBody] Equipo model)
        {
            if (id != model.Id)
                return BadRequest("El ID de la URL no coincide con el del modelo.");

            var result = await _equipoRepo.UpdateAsync(model);
            if (!result.Success)
                return NotFound(result.Message);

            return Ok(new { message = "Equipo actualizado correctamente." });
        }

        [HttpPost("crear-equipo")]
        public async Task<IActionResult> CrearEquipo([FromBody] Equipo equipo)
        {
            if (equipo == null)
                return BadRequest("El equipo no puede ser nulo.");

            if (string.IsNullOrWhiteSpace(equipo.Nombre))
                return BadRequest("El nombre del equipo es obligatorio.");

            equipo.FechaCreacion = DateTime.Now;

            await _equipoRepo.AddAsync(equipo);

            return Ok(new { message = "Equipo creado correctamente." });
        }


        #endregion
    }
}
