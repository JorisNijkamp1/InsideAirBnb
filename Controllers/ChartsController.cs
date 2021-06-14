﻿using System.Collections.Generic;
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
        
        [HttpGet("chart/review")]
        public async Task<IEnumerable<Chart>> GetReviewInfoChart()
        {
            var data = await _chartsRepository.GetReviewInfoChart();
            return data.OrderBy(chart => chart.Numbers);
        }
        
        [HttpGet("chart/availability")]
        public async Task<IEnumerable<Chart>> GetAvailabilityInfoChart()
        {
            var data = await _chartsRepository.GetAvailabilityInfoChart();
            return data.OrderBy(chart => chart.Numbers);
        }
        
        [HttpGet("chart/averagepriceneighbourhood")]
        public async Task<IEnumerable<ChartAveragePriceNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var data = await _chartsRepository.GetAveragePriceNeighbourhoodInfoChart();
            return data;
        }
    }
}