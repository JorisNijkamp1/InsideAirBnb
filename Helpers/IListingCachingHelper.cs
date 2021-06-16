using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Helpers
{
    public interface IListingCachingHelper
    {
        bool CacheExists(string KEY);
        void SetCachedLocations(string locations, string KEY);
        string GetCachedLocations(string KEY);
        void SetCachedAverageInfo(IEnumerable<ChartAverageNeighbourhood> chart, string KEY);
        Task<IEnumerable<ChartAverageNeighbourhood>> GetCachedAverageInfo(string KEY);
        Task<ActionResult<IEnumerable<Neighbourhood>>> GetCachedNeighbourhoods(string KEY);
        void SetCachedNeighbourhoods(List<Neighbourhood> neighbourhoods, string KEY);
    }
}