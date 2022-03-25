using wavecloud.Controllers.Poco_Models;

namespace wavecloud.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _dbcontext;
    private readonly ILogger<UserController> _logger;
    private readonly IConfiguration _config;

    public UserController(ApplicationDbContext dbcontext, ILogger<UserController> logger, IConfiguration config)
    {
        this._dbcontext = dbcontext;
        this._logger = logger;
        this._config = config;
    }
    
    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] UserLoginModel user)
    {
        var response = Unauthorized("could not find a user with such username or password") as IActionResult;
        
        var foundUser = await _dbcontext.Users.FirstOrDefaultAsync(e => e.Username == user.Username);

        if (BCrypt.Net.BCrypt.Verify(user.Password, foundUser?.Password))
            response = Ok(new {token = GenerateJwt()});
        
        return response;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel user)
    {
        var emailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");

        var match = emailRegex.Match(user.Email);

        if (!match.Success)
            return BadRequest("invalid email");

        var foundUserByUsername = await _dbcontext.Users.FirstOrDefaultAsync(e => e.Username == user.Username);

        if (foundUserByUsername is not null)
            return Conflict("user with this username already exists");
        
        var foundUserByEmail = await _dbcontext.Users.FirstOrDefaultAsync(e => e.Email == user.Email);

        if (foundUserByEmail is not null)
            return Conflict("user with this email already exists");
        
        if (user?.Username?.Trim().Length == 0)
            return BadRequest("invalid username");

        if (user?.Password?.Trim().Length == 0)
            return BadRequest("invalid password");

        var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
        
        await _dbcontext.Users.AddAsync(new User()
        {
            Username = user.Username,
            Email = user.Email,
            JoinedAt = DateTime.UtcNow,
            Password = BCrypt.Net.BCrypt.HashPassword(user?.Password, salt)
        });
        await _dbcontext.SaveChangesAsync();

        return Ok("user was registered successfully");
    }

    [HttpPost]
    [Route("profile")]
    [Authorize]
    public async Task<IActionResult> GetUserProfileInfo([FromBody] UserGetProfileInfoModel user)
    {
        var foundUser = await _dbcontext.Users.FirstOrDefaultAsync(e => e.Username == user.Username);

        if (foundUser is null)
            return NotFound("could not find user with provided name");

        return Ok(new
        {
            username = foundUser.Username,
            email = foundUser.Email
        });
    }
       
    private string GenerateJwt()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: null,
            expires: DateTime.Now.AddMinutes(999),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}