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

    }
}
