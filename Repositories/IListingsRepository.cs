using System.Collections.Generic;
using System.Threading.Tasks;

namespace InsideAirBnb.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
        Task<IEnumerable<LocationDetails>> GetLocationDetail(int id);
    }
}