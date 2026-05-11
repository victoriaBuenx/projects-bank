using System.IO;
using System.Threading.Tasks;

namespace ResidenceService.Api.Domain.interfaces;

public interface IMinioService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string bucketName = "entregables");
}
