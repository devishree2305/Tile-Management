using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TileManagement.Models
{
    [Table("products")]
    public class Products
    {
        [Key]
        [Column("prod_id")]
        public int ProdId { get; set; }

        [Column("category_id")]
        public int CategoryId { get; set; }

        [Column("application_id")]
        public int ApplicationId { get; set; }

        [Column("prod_name")]
        public string? ProdName { get; set; }

        [Column("sqcode")]
        public string? SqCode { get; set; }

        [Column("block")]
        public bool? Block { get; set; } = false;

        // Navigation properties
        [ForeignKey("CategoryId")]
        public CategoryMaster? Category { get; set; }

        [ForeignKey("ApplicationId")]
        public ApplicationMaster? Application { get; set; }
    }
}
