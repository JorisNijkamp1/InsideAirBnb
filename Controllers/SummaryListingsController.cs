using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsideAirBnb;

namespace InsideAirBnb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SummaryListingsController : ControllerBase
    {
        private readonly AirBNBContext _context;

        public SummaryListingsController(AirBNBContext context)
        {
            _context = context;
        }

        // GET: api/SummaryListings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SummaryListing>>> GetSummaryListings()
        {
            return await _context.SummaryListings.ToListAsync();
        }

        // GET: api/SummaryListings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SummaryListing>> GetSummaryListing(int id)
        {
            var summaryListing = await _context.SummaryListings.FindAsync(id);

            if (summaryListing == null)
            {
                return NotFound();
            }

            return summaryListing;
        }

        // PUT: api/SummaryListings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSummaryListing(int id, SummaryListing summaryListing)
        {
            if (id != summaryListing.Id)
            {
                return BadRequest();
            }

            _context.Entry(summaryListing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SummaryListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SummaryListings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SummaryListing>> PostSummaryListing(SummaryListing summaryListing)
        {
            _context.SummaryListings.Add(summaryListing);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SummaryListingExists(summaryListing.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSummaryListing", new { id = summaryListing.Id }, summaryListing);
        }

        // DELETE: api/SummaryListings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSummaryListing(int id)
        {
            var summaryListing = await _context.SummaryListings.FindAsync(id);
            if (summaryListing == null)
            {
                return NotFound();
            }

            _context.SummaryListings.Remove(summaryListing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SummaryListingExists(int id)
        {
            return _context.SummaryListings.Any(e => e.Id == id);
        }
    }
}
