using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TileManagement.Models
{
    [Table("application_master")]
    public class ApplicationMaster
    {
        [Key]
        [Column("application_id")]
        public int ApplicationId { get; set; }

        [Column("name")]
        public string? Name { get; set; }

        [Column("block")]
        public bool? Block { get; set; } = false;
    }
}
