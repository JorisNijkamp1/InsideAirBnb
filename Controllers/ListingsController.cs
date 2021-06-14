﻿using System.Collections.Generic;
using System.Threading.Tasks;
using InsideAirBnb.Helpers;
using Microsoft.AspNetCore.Mvc;
using InsideAirBnb.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace InsideAirBnb.Controllers
{
    [Authorize]
    [Route("api")]
    [ApiController]
    public class ListingsController : ControllerBase
    {

        private readonly IListingsRepository _listingsRepository;
        private readonly IListingCachingHelper _listingCachingHelper;
        
        public ListingsController(IListingsRepository listingsRepository, IListingCachingHelper listingCachingHelper)
        {
            _listingsRepository = listingsRepository;
            _listingCachingHelper = listingCachingHelper;
        }
        
        [HttpGet("locations")]
        [Authorize(Roles = "AdminUser")]
        public async Task<string> GetLocations()
        {
            if (_listingCachingHelper.CacheExists())
            {
                var result = _listingCachingHelper.GetCachedLocations();
                return result;
            }
            var locations = await _listingsRepository.GetLocations();
            _listingCachingHelper.SetCachedLocations(locations);
            
            return locations;
        }
        
        [HttpGet("location/{id}")]
        public async Task<LocationDetails> GetLocationDetail(int id)
        {
            var location = await _listingsRepository.GetLocationDetail(id);
            return location;
        }

        [HttpPost("locations/filter/price")]
        public async Task<string> GetLocationFilterPrice([FromBody] PriceFilter filter)
        {
            if (filter.price == 0)
            {
                var locations = await _listingsRepository.GetLocations();
                return locations;
            }else{
                var locations = await _listingsRepository.GetLocationFilterPrice(filter.price);
                return locations;
            }
        }
        
        [HttpPost("locations/filter/neighbourhood")]
        public async Task<string> GetLocationFilter([FromBody] NeighbourhoodFilter filter)
        {
            if (filter.neighbourhood == "")
            {
                var locations = await _listingsRepository.GetLocations();
                return locations;
            }
            else
            {
                var locations = await _listingsRepository.GetLocationFilterNeighbourhood(filter.neighbourhood);
                return locations;
            }
        }
        
        [HttpPost("locations/filter/review")]
        public async Task<string> GetLocationFilter([FromBody] ReviewFilter filter)
        {
            if (filter.reviewScoreValue == 0)
            {
                var locations = await _listingsRepository.GetLocations();
                return locations;
            }
            else
            {
                var locations = await _listingsRepository.GetLocationFilterReview(filter.reviewScoreValue);
                return locations;
            }
        }

        [HttpGet("neighbourhoods")]
        public async Task<ActionResult<IEnumerable<Neighbourhood>>> GetNeighbourhoods()
        {
            return await _listingsRepository.GetNeighbourhoods();
        }
        
        // GET: api/Listings
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Listing>>> GetListings()
        // {
        //     return await _context.Listings.ToListAsync();
        // }

        // PUT: api/Listings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutListing(int id, Listing listing)
        // {
        //     if (id != listing.Id)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(listing).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!ListingExists(id))
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

        // POST: api/Listings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Listing>> PostListing(Listing listing)
        // {
        //     _context.Listings.Add(listing);
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateException)
        //     {
        //         if (ListingExists(listing.Id))
        //         {
        //             return Conflict();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return CreatedAtAction("GetListing", new { id = listing.Id }, listing);
        // }

        // DELETE: api/Listings/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteListing(int id)
        // {
        //     var listing = await _context.Listings.FindAsync(id);
        //     if (listing == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _context.Listings.Remove(listing);
        //     await _context.SaveChangesAsync();
        //
        //     return NoContent();
        // }

        // private bool ListingExists(int id)
        // {
        //     return _context.Listings.Any(e => e.Id == id);
        // }
    }
}
