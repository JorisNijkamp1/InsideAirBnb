using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsideAirBnb.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
        Task<LocationDetails> GetLocationDetail(int id);
        Task<string> GetLocationFilter(double priceFilter);
    }
}