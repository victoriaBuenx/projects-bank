using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResidenceService.Api.Domain.interfaces;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ResidenceService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class FilesController : ControllerBase
{
    private readonly IMinioService _minioService;

    private static readonly string[] AllowedExtensions = { ".pdf", ".jpg", ".png", ".docx" };
    private static readonly string[] AllowedContentTypes = {
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    };
    private const long MaxFileSize = 10 * 1024 * 1024; 

    public FilesController(IMinioService minioService)
    {
        _minioService = minioService;
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        Console.WriteLine($"Files count: {Request.Form.Files.Count}");
        Console.WriteLine($"Form keys: {string.Join(", ", Request.Form.Keys)}");
        Console.WriteLine($"File is null: {file == null}");

        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var url = await _minioService.UploadFileAsync(stream, fileName, file.ContentType);

            return Ok(new { url });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error uploading file", error = ex.Message });
        }
    }

    [HttpPost("upload-vulnerable")]
    [DisableRequestSizeLimit]
    public IActionResult UploadVulnerable([FromForm] IFormFile file)
    {
        if (file == null) return BadRequest("No file uploaded.");
        
        var tienePathTraversal = file.FileName.Contains("..") || 
                                file.FileName.Contains("/") || 
                                file.FileName.Contains("\\");
        return Ok(new
        {
            archivo = file.FileName,
            extension = Path.GetExtension(file.FileName),
            contentType = file.ContentType,
            tamañoMB = Math.Round((double)file.Length / (1024 * 1024), 2),
            pathTraversalDetectado = tienePathTraversal,
            aceptado = true
        });
    }

    [HttpPost("upload-protected")]
    [RequestSizeLimit(10 * 1024 * 1024)]
    public IActionResult UploadProtected([FromForm] IFormFile file)
    {
        if (file == null) return BadRequest("No file uploaded.");

        if (file.FileName.Contains("..") || file.FileName.Contains("/") || file.FileName.Contains("\\"))
            return BadRequest(new { error = "Nombre de archivo inválido — path traversal detectado" });

        var extensionesPermitidas = new[] { ".pdf", ".jpg", ".png", ".docx" };
        var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
        
        if (!extensionesPermitidas.Contains(extension))
            return BadRequest(new { error = $"Extensión '{extension}' no permitida" });

        return Ok(new
        {
            archivoOriginal = file.FileName,
            archivoSanitizado = $"{Guid.NewGuid()}{extension}",
            tamañoMB = Math.Round((double)file.Length / (1024 * 1024), 2),
            aceptado = true
        });
    }
}
