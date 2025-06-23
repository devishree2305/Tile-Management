using TileManagement.Models;

namespace TileManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 

        }
        public DbSet<Products> Products { get; set; }
        public DbSet<CategoryMaster> CategoryMasters { get; set; }
        public DbSet<ApplicationMaster> ApplicationMasters { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
