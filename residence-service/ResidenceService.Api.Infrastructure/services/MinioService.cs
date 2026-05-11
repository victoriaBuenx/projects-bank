using Minio;
using Minio.DataModel.Args;
using ResidenceService.Api.Domain.interfaces;
using System.IO;
using System.Threading.Tasks;

namespace ResidenceService.Api.Infrastructure.services;

public class MinioService : IMinioService
{
    private readonly IMinioClient _minioClient;
    private const string Endpoint = "minio:9000";
    private const string AccessKey = "admin";
    private const string SecretKey = "admin123";
    private const string PublicBaseUrl = "http://localhost:9000";

    public MinioService()
    {
        _minioClient = new MinioClient()
            .WithEndpoint(Endpoint)
            .WithCredentials(AccessKey, SecretKey)
            .WithSSL(false)
            .Build();
    }

    private async Task EnsureBucketExistsAsync(string bucketName)
    {
        var found = await _minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName));
        if (!found)
        {
            await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));
            
            // Set public read policy
            var policy = $@"{{
                ""Version"": ""2012-10-17"",
                ""Statement"": [
                    {{
                        ""Effect"": ""Allow"",
                        ""Principal"": {{ ""AWS"": [ ""*"" ] }},
                        ""Action"": [ ""s3:GetBucketLocation"", ""s3:ListBucket"" ],
                        ""Resource"": [ ""arn:aws:s3:::{bucketName}"" ]
                    }},
                    {{
                        ""Effect"": ""Allow"",
                        ""Principal"": {{ ""AWS"": [ ""*"" ] }},
                        ""Action"": [ ""s3:GetObject"" ],
                        ""Resource"": [ ""arn:aws:s3:::{bucketName}/*"" ]
                    }}
                ]
            }}";
            await _minioClient.SetPolicyAsync(new SetPolicyArgs().WithBucket(bucketName).WithPolicy(policy));
        }
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string bucketName = "entregables")
    {
        await EnsureBucketExistsAsync(bucketName);

        var putObjectArgs = new PutObjectArgs()
            .WithBucket(bucketName)
            .WithObject(fileName)
            .WithStreamData(fileStream)
            .WithObjectSize(fileStream.Length)
            .WithContentType(contentType);

        await _minioClient.PutObjectAsync(putObjectArgs);

        return $"{PublicBaseUrl}/{bucketName}/{fileName}";
    }
}
