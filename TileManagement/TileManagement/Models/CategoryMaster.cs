using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TileManagement.Models
{
    [Table("category_master")]
    public class CategoryMaster
    {
        [Key]
        [Column("category_id")]
        public int CategoryId { get; set; }

        [Column("name")]
        public string? Name { get; set; }

        [Column("block")]
        public bool? Block { get; set; } = false; // Default to false (0)
    }
}
