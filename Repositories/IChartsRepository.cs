using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsideAirBnb.Repositories
{
    public interface IChartsRepository
    {
        Task<IEnumerable<Chart>> GetAvailabilityInfoChart();
        Task<IEnumerable<ChartAveragePriceNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart();
        Task<IEnumerable<ChartAverageAvailabilityNeighbourhood>> GetAverageAvailabilityNeighbourhoodInfoChart();
    }
}