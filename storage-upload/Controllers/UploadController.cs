namespace storage_upload.Controllers;

[ApiController]
[Route("upload")]
public class UploadController : ControllerBase
{
    private readonly ILogger<UploadController> _logger;
    private readonly IConfiguration _config;
    
    public UploadController(ILogger<UploadController> logger, IConfiguration config)
    {
        this._logger = logger;
        this._config = config;
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadFileToStorage(IFormFile file, string fileName, string trackId, CancellationToken cancellationToken)
    {
        var dbx = new DropboxClient(_config["Dropbox:Token"]);
        var memoryStream = new MemoryStream(await GetBytes(file));

        var path = $"/tracks/{trackId}-{fileName}-{Guid.NewGuid()}.mp3";
        
        await dbx.Files.UploadAsync(
            path,
            WriteMode.Overwrite.Instance,
            body: memoryStream
        );
        
        return Ok();
    }
    
    public static async Task<byte[]> GetBytes(IFormFile formFile)
    {
        using (var memoryStream = new MemoryStream())
        {
            await formFile.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}