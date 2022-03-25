using System.Net.Http.Headers;

namespace wavecloud.Controllers;

[ApiController]
[Route("track")]
public class TrackController : ControllerBase
{
    private readonly ApplicationDbContext _dbcontext;
    private readonly IConfiguration _config;

    public TrackController(ApplicationDbContext dbcontext, IConfiguration config)
    {
        this._dbcontext = dbcontext;
        this._config = config;
    }

    [HttpPost]
    [Route("upload")]
    [Authorize]
    public async Task<IActionResult> UploadTrack(IFormFile file, string fileName, int userId)
    {

        var track = new Track()
        {
            trackName = fileName.Replace(".mp3", ""),
            UploadDate = DateTime.UtcNow,
            UserId = userId
        };
        
        // save data to database

        await _dbcontext.Tracks.AddAsync(track);
        await _dbcontext.SaveChangesAsync();
        
        // upload file to storage
        
        var client = new HttpClient();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await GetToken()); 

        var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        memoryStream.Position = 0;
        
        var bytes = new ByteArrayContent(memoryStream.ToArray());
        
        var multiContent = new MultipartFormDataContent
        {
            { bytes, "file", fileName }
        };

        var trackId = (await _dbcontext.Tracks.FirstOrDefaultAsync(e => e.trackName == fileName))?.Id;
        
        Console.WriteLine(trackId);
        
        var response = await client.PostAsync(_config["ServiceUrls:StorageUpload"] + $"/upload?fileName={trackId}-{fileName}", multiContent);

        return Ok(JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync()));
    }

    [HttpGet]
    [Route("download")]
    [Authorize]
    public async Task<IActionResult> DownloadTrack(int trackId)
    {
        var track = _dbcontext.Tracks.FirstOrDefault(e => e.Id == trackId);

        var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",  await GetToken());

        var response = await client.GetAsync(_config["ServiceUrls:StorageUpload"] + $"/download?fileName={trackId}-{track?.trackName}");

        var fileStream = await response.Content.ReadAsStreamAsync();

        var memoryStream = new MemoryStream();
        await fileStream.CopyToAsync(memoryStream);

        memoryStream.Position = 0;
        
        return File(memoryStream, "audio/mpeg", track?.trackName);
    }

    private async Task<string> GetToken()
    {
        var httpClient = new HttpClient();

        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _config["Tokens:Upload"]);

        var response = await httpClient.GetAsync(_config["ServiceUrls:StorageUpload"] + "/auth/token");

        dynamic? obj = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());

        return obj?.token ?? throw new NullReferenceException("token is null");
    }
}