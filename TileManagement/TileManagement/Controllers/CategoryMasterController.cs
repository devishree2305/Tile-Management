using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TileManagement.Data;
using TileManagement.Models;

namespace TileManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryMasterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryMasterController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/categorymaster
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(_context.CategoryMasters.ToList());
        }

        // GET: api/categorymaster/{id}
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _context.CategoryMasters.Find(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        // POST: api/categorymaster
        [HttpPost]
        public IActionResult Create([FromBody] CategoryMaster cat)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.CategoryMasters.Add(cat);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCategoryById), new { id = cat.CategoryId }, cat);
        }

        // PUT: api/categorymaster/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] CategoryMaster updated)
        {
            if (id != updated.CategoryId)
                return BadRequest();

            var existing = _context.CategoryMasters.Find(id);
            if (existing == null)
                return NotFound();

            existing.Name = updated.Name;
            existing.Block = updated.Block;

            // Block all related products if this category is blocked
            if (updated.Block == true)
            {
                var relatedProducts = _context.Products
                    .Where(p => p.CategoryId == id)
                    .ToList();

                foreach (var product in relatedProducts)
                {
                    product.Block = true;
                }
            }

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/categorymaster/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.CategoryMasters.Find(id);
            if (category == null)
                return NotFound();

            _context.CategoryMasters.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
