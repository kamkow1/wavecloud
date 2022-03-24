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

        var response = await client.PostAsync(_config["ServiceUrls:StorageUpload"] + $"/upload?fileName={fileName}&trackId=7239", multiContent);
        
        // save data to database

        await _dbcontext.Tracks.AddAsync(new Track()
        {
            trackName = fileName.Replace(".mp3", ""),
            UploadDate = DateTime.UtcNow,
            AssociatedFileName = fileName,
            UserId = userId
        });

        await _dbcontext.SaveChangesAsync();

        return Ok(JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync()));
    }

    private async Task<string> GetToken()
    {
        var httpClient = new HttpClient();

        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _config["Tokens:Upload"]);

        var response = await httpClient.GetAsync(_config["ServiceUrls:StorageUpload"] + "/auth/token");

        dynamic obj = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());

        return obj.token;
    }
}