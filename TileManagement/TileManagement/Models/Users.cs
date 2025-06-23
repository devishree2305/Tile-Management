using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TileManagement.Models
{
    [Table("users")]
    public class Users
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [Column("username")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [Column("role")]
        public string Role { get; set; } = "viewer"; // "editor" or "viewer"
    }
}
