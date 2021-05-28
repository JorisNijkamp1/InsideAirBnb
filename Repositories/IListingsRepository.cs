using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnb.Repositories
{
    public interface IListingsRepository
    {
        Task<string> GetLocations();
        Task<List<Neighbourhood>> GetNeighbourhoods();
        Task<LocationDetails> GetLocationDetail(int id);
        Task<string> GetLocationFilterPrice(double priceFilter);
        Task<string> GetLocationFilterNeighbourhood(string neighbourhoodFilter);
        Task<string> GetLocationFilterReview(int neighbourhoodFilter);
    }
}