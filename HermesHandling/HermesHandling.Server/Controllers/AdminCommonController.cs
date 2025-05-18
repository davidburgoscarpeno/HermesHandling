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

            var filePath = Path.Combine(path, model.Nombre + extension);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.Documento.CopyToAsync(stream);
            }

            // Ahora usamos el _context inyectado
            DocumentacionInterna document = new DocumentacionInterna()
            {
                Nombre = model.Nombre,
                PathDocumento = filePath,
                FechaAlta = DateTime.Now,
                Activo = true,
                IdUsuarioAlta = null, // O asigna un valor explícito
                IdUsuarioModificacion = null
            };

            using (HermesDbContext context = new HermesDbContext())
            {
                context.DocumentacionInternas.Add(document);
                await context.SaveChangesAsync();
            }
            

            return Ok(new { message = "Documento subido correctamente." });
        }


        //Documentacion Interna
        // Ruta para listar la documentacion interna
        [HttpGet("listar-documentacion-interna")]
        public IActionResult ListarDocumentacionInternaApp()
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var documentacion = context.DocumentacionInternas.ToList();
                return Ok(documentacion);
            }
        }

        [HttpPut("editar-documentacion/{id}")]
        public async Task<IActionResult> EditarDocumentacion(int id, [FromForm] DocumentacionInternaViewModel model)
        {
            if (model.Documento != null && model.Documento.Length > 0)
            {
                var allowedExtensions = new[] { ".pdf", ".docx" };
                var extension = Path.GetExtension(model.Documento.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Solo se permiten archivos PDF o DOCX.");
            }

            using (HermesDbContext context = new HermesDbContext())
            {
                // Buscar el registro en la base de datos
                var documentacion = await context.DocumentacionInternas.FindAsync(id);
                if (documentacion == null)
                    return NotFound("No se encontró la documentación interna con el ID proporcionado.");

                // Obtener la ruta del directorio
                var path = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "FicherosOcultosWeb", "DocumentacionInterna");
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                // Si se subió un nuevo archivo, reemplazar el existente
                if (model.Documento != null && model.Documento.Length > 0)
                {
                    // Eliminar el archivo anterior si existe
                    if (!string.IsNullOrEmpty(documentacion.PathDocumento) && System.IO.File.Exists(documentacion.PathDocumento))
                    {
                        System.IO.File.Delete(documentacion.PathDocumento);
                    }

                    // Guardar el nuevo archivo
                    var filePath = Path.Combine(path, model.Nombre + Path.GetExtension(model.Documento.FileName).ToLower());
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await model.Documento.CopyToAsync(stream);
                    }

                    // Actualizar la ruta del archivo en la base de datos
                    documentacion.PathDocumento = filePath;
                }

                // Actualizar otros campos
                documentacion.Nombre = model.Nombre;
                documentacion.FechaModificacion = DateTime.Now;

                // Guardar los cambios en la base de datos
                context.DocumentacionInternas.Update(documentacion);
                await context.SaveChangesAsync();

                return Ok(new { message = "Documentación interna actualizada correctamente." });
            }
        }




        [HttpDelete("eliminar-documentacion/{id}")]
        public async Task<IActionResult> EliminarDocumentacion(int id)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var documentacion = await context.DocumentacionInternas.FindAsync(id);
                if (documentacion == null)
                    return NotFound("No se encontró la documentación interna con el ID proporcionado.");

                if (!string.IsNullOrEmpty(documentacion.PathDocumento) && System.IO.File.Exists(documentacion.PathDocumento))
                {
                    System.IO.File.Delete(documentacion.PathDocumento);
                }

                context.DocumentacionInternas.Remove(documentacion);
                await context.SaveChangesAsync();

                return Ok(new { message = "Documentación interna eliminada correctamente." });
            }
        }

        [HttpGet("obtener-documentacion-interna/{id}")]
        public async Task<IActionResult> ObtenerDocumentacionInterna(int id)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var documentacion = await context.DocumentacionInternas.FindAsync(id);
                if (documentacion == null)
                    return NotFound("No se encontró la documentación interna con el ID proporcionado.");

                return Ok(new
                {
                    documentacion.Nombre,
                    documentacion.PathDocumento
                });
            }
        }
        #endregion

        #region Comunicaciones

        // GET: api/AdminCommon/listar-comunicaciones
        [HttpGet("listar-comunicaciones")]
        public IActionResult ListarComunicaciones()
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var comunicaciones = context.Comunicaciones
                    .OrderByDescending(c => c.FechaPublicacion)
                    .ToList();
                return Ok(comunicaciones);
            }
        }

        // GET: api/AdminCommon/obtener-comunicacion/{id}
        [HttpGet("obtener-comunicacion/{id}")]
        public async Task<IActionResult> ObtenerComunicacion(int id)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var comunicacion = await context.Comunicaciones.FindAsync(id);
                if (comunicacion == null)
                    return NotFound("No se encontró la comunicación con el ID proporcionado.");

                return Ok(comunicacion);
            }
        }

        // POST: api/AdminCommon/crear-comunicacion
        [HttpPost("crear-comunicacion")]
        public async Task<IActionResult> CrearComunicacion([FromBody] Comunicacione comunicacion)
        {
            if (string.IsNullOrWhiteSpace(comunicacion.Asunto) || string.IsNullOrWhiteSpace(comunicacion.Mensaje))
                return BadRequest("El asunto y el mensaje son obligatorios.");

            comunicacion.FechaPublicacion = comunicacion.FechaPublicacion ?? DateTime.Now;
            comunicacion.FechaAlta = DateTime.Now;

            using (HermesDbContext context = new HermesDbContext())
            {
                context.Comunicaciones.Add(comunicacion);
                await context.SaveChangesAsync();
            }

            return Ok(new { message = "Comunicación creada correctamente." });
        }

        // PUT: api/AdminCommon/editar-comunicacion/{id}
        [HttpPut("editar-comunicacion/{id}")]
        public async Task<IActionResult> EditarComunicacion(int id, [FromBody] Comunicacione model)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var comunicacion = await context.Comunicaciones.FindAsync(id);
                if (comunicacion == null)
                    return NotFound("No se encontró la comunicación con el ID proporcionado.");

                comunicacion.Asunto = model.Asunto;
                comunicacion.Mensaje = model.Mensaje;
                comunicacion.FechaPublicacion = model.FechaPublicacion ?? comunicacion.FechaPublicacion;
                comunicacion.FechaModificacion = DateTime.Now;
                comunicacion.IdUsuarioModificacion = model.IdUsuarioModificacion;

                context.Comunicaciones.Update(comunicacion);
                await context.SaveChangesAsync();

                return Ok(new { message = "Comunicación actualizada correctamente." });
            }
        }

        // DELETE: api/AdminCommon/eliminar-comunicacion/{id}
        [HttpDelete("eliminar-comunicacion/{id}")]
        public async Task<IActionResult> EliminarComunicacion(int id)
        {
            using (HermesDbContext context = new HermesDbContext())
            {
                var comunicacion = await context.Comunicaciones.FindAsync(id);
                if (comunicacion == null)
                    return NotFound("No se encontró la comunicación con el ID proporcionado.");

                context.Comunicaciones.Remove(comunicacion);
                await context.SaveChangesAsync();

                return Ok(new { message = "Comunicación eliminada correctamente." });
            }
        }
        #endregion
    }
}
