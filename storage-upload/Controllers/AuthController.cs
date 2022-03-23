using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace storage_upload.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    
    public AuthController(IConfiguration config)
    {
        this._config = config;
    }
    
    [HttpGet]
    [Route("token")]
    [AllowAnonymous]
    public IActionResult GetToken()
    {
        IActionResult response = Unauthorized();
        
        if (Request.Headers.Authorization == "Bearer " + _config["AccessToken"])
            response = Ok(new { token = GenerateJwt() });

        return response;
    }
    
    private string GenerateJwt()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: null,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}