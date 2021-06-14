using System.Collections.Generic;
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
    }
}
