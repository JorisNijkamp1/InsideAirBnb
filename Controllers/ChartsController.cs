using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        
        public ChartsController(IChartsRepository chartsRepository)
        {
            _chartsRepository = chartsRepository;
        }

        [HttpGet("chart/availability")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageReviewInfoChart()
        {
            var data = await _chartsRepository.GetAverageReviewInfoChart();
            return data.OrderBy(chart => chart.Numbers);
        }

        [HttpGet("chart/housetypes")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageAvailabilityNeighbourhoodInfoChart()
        {
            var data = await _chartsRepository.GetAccomodationsTypesInfoChart();
            return data;
        }
        
        [HttpGet("chart/averagepriceneighbourhood")]
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var data = await _chartsRepository.GetAveragePriceNeighbourhoodInfoChart();
            return data;
        }
    }
}