namespace storage_upload.Controllers;

[ApiController]
[Route("download")]
public class DownloadController : ControllerBase
{
    private readonly IConfiguration _config;
    
    public DownloadController(IConfiguration config)
    {
        this._config = config;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DownloadTrack(string fileName)
    {
        var dbx = new DropboxClient(_config["Dropbox:Token"]);

        var download = await dbx.Files.DownloadAsync("/tracks/" + fileName + ".mp3");
        var memoryStream = new MemoryStream();
        await (await download.GetContentAsStreamAsync()).CopyToAsync(memoryStream);

        memoryStream.Position = 0;
        
        return File(memoryStream , "audio/mpeg", fileName.Split("-")[1]);
    }
}