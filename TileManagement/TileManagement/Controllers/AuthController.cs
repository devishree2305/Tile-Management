using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TileManagement.Data;
using TileManagement.Models;

namespace TileManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _hasher;

        public AuthController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
            _hasher = new PasswordHasher<User>();
        }

        // 🔐 LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserAuthDto login)
        {
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == login.Username);

            if (dbUser == null)
                return Unauthorized(new { message = "Invalid username or password" });

            var dummyUser = new User { Username = dbUser.Username };
            var result = _hasher.VerifyHashedPassword(dummyUser, dbUser.PasswordHash, login.Password);

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(new { message = "Invalid username or password" });

            var token = GenerateJwtToken(dbUser);

            return Ok(new
            {
                token,
                user = new { dbUser.Username, dbUser.Role }
            });
        }

        // 📝 REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserAuthDto register)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == register.Username);

            if (existingUser != null)
                return BadRequest(new { message = "Username already taken" });

            var newUser = new Users
            {
                Username = register.Username,
                Role = "viewer"
            };

            var dummyUser = new User { Username = register.Username };
            newUser.PasswordHash = _hasher.HashPassword(dummyUser, register.Password);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(newUser);

            return Ok(new
            {
                token,
                user = new { newUser.Username, newUser.Role }
            });
        }

        // 🔑 JWT Generator
        private string GenerateJwtToken(Users user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // ✅ Unified DTO
        public class UserAuthDto
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        // ✅ Lightweight model for hashing
        private class User
        {
            public string? Username { get; set; }
        }
    }
}
