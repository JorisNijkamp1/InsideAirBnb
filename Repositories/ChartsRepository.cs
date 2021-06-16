using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InsideAirBnb.Repositories
{
    public class ChartsRepository : IChartsRepository
    {
        private readonly AirBNBContext _context;

        public ChartsRepository(AirBNBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Chart>> GetReviewInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.ReviewScoresRating / 10)
                .Select(s => new Chart
                {
                    Numbers = s.Key,
                    Count = s.Count()
                }).ToListAsync());
            var ratings = charts.Where(x => x.Numbers != null).ToArray();
            return ratings;
        }
        
        public async Task<IEnumerable<Chart>> GetAvailabilityInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Availability30)
                .Select(s => new Chart
                {
                    Numbers = s.Key,
                    Count = s.Count()
                }).ToListAsync());
            var data = charts.Where(x => x.Numbers != 0).ToArray();
            
            return data;
        }
        
        // TODO fix averageprice
        public async Task<IEnumerable<ChartAveragePriceNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Neighbourhood)
                .Select(s => new ChartAveragePriceNeighbourhood
                {
                    Numbers = s.Key,
                    Count = s.Average(x => x.Availability30)
                }).ToListAsync());

            return charts;
        }
        
        public async Task<IEnumerable<ChartAverageAvailabilityNeighbourhood>> GetAverageAvailabilityNeighbourhoodInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Neighbourhood)
                .Select(s => new ChartAverageAvailabilityNeighbourhood
                {
                    Numbers = s.Key,
                    Count = s.Average(x => x.Availability30)
                }).ToListAsync());

            return charts;
        }
    }
}