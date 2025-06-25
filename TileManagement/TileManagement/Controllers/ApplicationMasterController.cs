using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TileManagement.Data;
using TileManagement.Models;

namespace TileManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationMasterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationMasterController(AppDbContext context)
        {
            _context = context;
        }

        //GET: api/applicationmaster
        [HttpGet]
        public IActionResult GetAllApplications()
        {
            var applications = _context.ApplicationMasters.ToList();
            return Ok(applications);
        }

        // GET: api/applicationmaster/{id}
        [HttpGet("{id}")]
        public IActionResult GetApplicationById(int id)
        {
            var app = _context.ApplicationMasters.Find(id);
            if (app == null)
                return NotFound();

            return Ok(app);
        }

        // POST: api/applicationmaster
        [HttpPost]
        public IActionResult CreateApplication([FromBody] ApplicationMaster app)
        {
            _context.ApplicationMasters.Add(app);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetApplicationById), new { id = app.ApplicationId }, app);
        }

        // ✅ PUT: api/applicationmaster/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateApplication(int id, [FromBody] ApplicationMaster updated)
        {
            if (id != updated.ApplicationId)
                return BadRequest("ID mismatch");

            var existing = _context.ApplicationMasters.Find(id);
            if (existing == null)
                return NotFound("Application not found");

            // Update application fields
            existing.Name = updated.Name;
            existing.Block = updated.Block ?? false;

            if (updated.Block == true)
            {
                var relatedProducts = _context.Products
                    .Where(p => p.ApplicationId == id)
                    .ToList();

                foreach (var product in relatedProducts)
                {
                    product.Block = true;
                }
            }


            _context.SaveChanges();
            return Ok(new { message = "Application updated successfully." });
        }

        // DELETE: api/applicationmaster/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteApplication(int id)
        {
            var app = _context.ApplicationMasters.Find(id);
            if (app == null)
                return NotFound("Application not found");

            _context.ApplicationMasters.Remove(app);
            _context.SaveChanges();

            return Ok(new { message = "Application deleted successfully." });
        }
    }
}
