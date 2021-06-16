using System;
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

        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageReviewInfoChart()
        {
             var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Neighbourhood)
                .Select(s => new ChartAverageNeighbourhood
                {
                    Numbers = s.Key,
                    Count = s.Average(x => x.ReviewScoresRating / 10)
                }).ToListAsync());
            
            var data = charts.Where(x => x.Numbers != null).ToArray();

            return data;
        }
        
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.Neighbourhood)
                .Select(s => new ChartAverageNeighbourhood
                {
                    Numbers = s.Key,
                    Count = s.Average(x => Convert.ToDouble(
                        x.Price.Replace("$", "")
                            .Replace(",", "")
                            .Replace(".00", "")
                    ))
                }).ToListAsync());
            
            var data = charts.Where(x => x.Numbers != null).ToArray();

            return data;
        }
        
        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetAccomodationsTypesInfoChart()
        {
            var charts = await Task.Run(() => _context.Listings
                .GroupBy(x => x.PropertyType)
                .Select(s => new ChartAverageNeighbourhood
                {
                    Numbers = s.Key,
                    Count = s.Count()
                }).ToListAsync());
            
            var data = charts.Where(x => x.Numbers != null).ToArray();

            return data;
        }
    }
}