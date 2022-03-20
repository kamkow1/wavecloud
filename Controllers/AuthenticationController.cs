using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using wavecloud.Data;
using wavecloud.Data.Models;

namespace wavecloud.Controllers;

[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly ApplicationDbContext _dbcontext;
    private readonly IConfiguration _configuration;
    
    public AuthenticationController(ApplicationDbContext dbcontext, IConfiguration configuration)
    {
        this._dbcontext = dbcontext;
        this._configuration = configuration;
    }
    
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Authenticate([FromBody] User user)
    {
        var response = Unauthorized("could not find a user with such username or password") as IActionResult;
        
        var foundUser = await _dbcontext.Users.FirstOrDefaultAsync(e => e.Username == user.Username);

        if (BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
            response = Ok(new {token = GenerateJWT()});

        return response;
    }

    private string GenerateJWT()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: null,
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}