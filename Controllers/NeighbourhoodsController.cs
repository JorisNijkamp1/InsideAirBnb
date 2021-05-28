﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsideAirBnb;
using InsideAirBnb.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace InsideAirBnb.Controllers
{
    [Authorize]
    [Route("api")]
    [ApiController]
    public class NeighbourhoodsController : ControllerBase
    {
        // private readonly INeighbourhoodRepository _neighbourhoodRepository;
        //
        // public NeighbourhoodsController(INeighbourhoodRepository neighbourhoodRepository)
        // {
        //     _neighbourhoodRepository = neighbourhoodRepository;
        // }

        // GET: api/Neighbourhoods
        // [HttpGet("neighbourhoods")]
        // [Authorize(Roles = "StandardUser")]
        // public async Task<ActionResult<IEnumerable<Neighbourhood>>> GetNeighbourhoods()
        // {
            // return await _neighbourhoodRepository.GetNeighbourhoods();
        // }

        // GET: api/Neighbourhoods/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Neighbourhood>> GetNeighbourhood(string id)
        // {
        //     var neighbourhood = await _context.Neighbourhoods.FindAsync(id);
        //
        //     if (neighbourhood == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return neighbourhood;
        // }

        // PUT: api/Neighbourhoods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutNeighbourhood(string id, Neighbourhood neighbourhood)
        // {
        //     if (id != neighbourhood.Neighbourhood1)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(neighbourhood).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!NeighbourhoodExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return NoContent();
        // }

        // POST: api/Neighbourhoods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Neighbourhood>> PostNeighbourhood(Neighbourhood neighbourhood)
        // {
        //     _context.Neighbourhoods.Add(neighbourhood);
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateException)
        //     {
        //         if (NeighbourhoodExists(neighbourhood.Neighbourhood1))
        //         {
        //             return Conflict();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return CreatedAtAction("GetNeighbourhood", new { id = neighbourhood.Neighbourhood1 }, neighbourhood);
        // }

        // DELETE: api/Neighbourhoods/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteNeighbourhood(string id)
        // {
        //     var neighbourhood = await _context.Neighbourhoods.FindAsync(id);
        //     if (neighbourhood == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _context.Neighbourhoods.Remove(neighbourhood);
        //     await _context.SaveChangesAsync();
        //
        //     return NoContent();
        // }

        // private bool NeighbourhoodExists(string id)
        // {
        //     return _context.Neighbourhoods.Any(e => e.Neighbourhood1 == id);
        // }
    }
}
