using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using wavecloud.Data;
using wavecloud.Data.Models;

namespace wavecloud.Controllers;

[Route("user")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _dbcontext;
    
    public UserController(ApplicationDbContext dbcontext)
    {
        this._dbcontext = dbcontext;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] User user)
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
        
        if (user.Username.Trim().Length == 0)
            return BadRequest("invalid username");

        if (user.Password.Trim().Length == 0)
            return BadRequest("invalid password");

        var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
        
        await _dbcontext.Users.AddAsync(new User()
        {
            Username = user.Username,
            Email = user.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(user.Password, salt)
        });
        await _dbcontext.SaveChangesAsync();

        return Ok("user was registered successfully");
    }
}