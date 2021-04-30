using System.Threading.Tasks;

namespace InsideAirBnb.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
    }
}