using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TileManagement.Data;
using TileManagement.Models;

namespace TileManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Application)
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Application)
                .FirstOrDefaultAsync(p => p.ProdId == id);

            if (product == null)
                return NotFound(new { message = $"Product with ID {id} not found." });

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Products prod)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { message = "Validation failed", errors });
            }

            _context.Products.Add(prod);
            await _context.SaveChangesAsync();

            return Ok(prod);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Products updated)
        {
            if (id != updated.ProdId)
                return BadRequest(new { message = "Product ID mismatch." });

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { message = "Validation failed", errors });
            }

            var existing = await _context.Products.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = $"Product with ID {id} not found." });

            // Check category and application block status
            var category = await _context.CategoryMasters.FindAsync(updated.CategoryId);
            var application = await _context.ApplicationMasters.FindAsync(updated.ApplicationId);

            if (category == null || application == null)
            {
                return BadRequest(new { message = "Category or Application not found." });
            }

            // Update values
            existing.ProdName = updated.ProdName;
            existing.SqCode = updated.SqCode;
            existing.CategoryId = updated.CategoryId;
            existing.ApplicationId = updated.ApplicationId;
            existing.Block = updated.Block;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = $"Product with ID {id} not found." });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Product deleted successfully." });
        }
    }
}
