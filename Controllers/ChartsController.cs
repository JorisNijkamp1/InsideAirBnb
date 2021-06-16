using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InsideAirBnb.Helpers;
using InsideAirBnb.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Controllers
{
    [Authorize(Roles = "AdminUser")]
    [Route("api")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private readonly IChartsRepository _chartsRepository;
        private readonly IListingCachingHelper _listingCachingHelper;

        public ChartsController(IChartsRepository chartsRepository, IListingCachingHelper listingCachingHelper)
        {
            _chartsRepository = chartsRepository;
            _listingCachingHelper = listingCachingHelper;
        }

        [HttpGet("chart/availability")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageReviewInfoChart()
        {
            const string key = "averageReviewInfo";

            if (_listingCachingHelper.CacheExists(key))
            {
                return await _listingCachingHelper.GetCachedAverageInfo(key);
            }

            var data = await _chartsRepository.GetAverageReviewInfoChart();
            _listingCachingHelper.SetCachedAverageInfo(data, key);
            return data.OrderBy(chart => chart.Numbers);
        }

        [HttpGet("chart/housetypes")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageAvailabilityNeighbourhoodInfoChart()
        {
            const string key = "averageAvailabilityNeighbourhood";

            if (_listingCachingHelper.CacheExists(key))
            {
                return await _listingCachingHelper.GetCachedAverageInfo(key);
            }

            var data = await _chartsRepository.GetAccomodationsTypesInfoChart();
            _listingCachingHelper.SetCachedAverageInfo(data, key);
            return data;
        }

        [HttpGet("chart/averagepriceneighbourhood")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart()
        {
            const string key = "averagePriceNeighbourhood";

            if (_listingCachingHelper.CacheExists(key))
            {
                return await _listingCachingHelper.GetCachedAverageInfo(key);
            }
            
            var data = await _chartsRepository.GetAveragePriceNeighbourhoodInfoChart();
            _listingCachingHelper.SetCachedAverageInfo(data, key);

            return data;
        }
    }
}