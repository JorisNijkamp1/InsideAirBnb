using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsideAirBnb.Repositories
{
    public interface IChartsRepository
    {
        Task<IEnumerable<ChartAverageNeighbourhood>> GetAverageReviewInfoChart();
        Task<IEnumerable<ChartAverageNeighbourhood>> GetAveragePriceNeighbourhoodInfoChart();
        Task<IEnumerable<ChartAverageNeighbourhood>> GetAccomodationsTypesInfoChart();
    }
}