using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace InsideAirBnb.Repositories
{
    public class ListingRepository : IListingsRepository
    {
        private readonly AirBNBContext _context;

        public ListingRepository(AirBNBContext context)
        {
            _context = context;
        }

        public async Task<string> GetLocations()
        {
            var locationsList = await _context.Listings.Select(location => new Locations
                {Id = location.Id, Latitude = location.Latitude, Longitude = location.Longitude}).ToListAsync();
            var json = ConvertToGeoJson(locationsList);
            return json;
        }

        public async Task<List<Neighbourhood>> GetNeighbourhoods()
        {
            var neighbourhoods = await Task.Run(() => _context.Listings.Select(n => new Neighbourhood
            {
                Neighbourhood1 = n.Neighbourhood
            }).Where(w => w.Neighbourhood1 != null).Distinct().ToListAsync());
            return neighbourhoods;
        }

        
        public async Task<LocationDetails> GetLocationDetail(int id)
        {
            return await _context.Listings.Where(listing => id == listing.Id)
                .Select(i => new LocationDetails
                {
                    Name = i.Name,
                    Neighborhood = i.Neighbourhood,
                    Price = i.Price
                }).SingleAsync();
        }

        public async Task<string> GetLocationFilterPrice(double priceFilter)
        {
            var locationsList = await _context.Listings.Where(x => 
                    Convert.ToInt32(
                        x.Price.Replace("$", "")
                            .Replace(",", "")
                            .Replace(".00", "")
                        ) < priceFilter)
                .Select(location => new Locations
                {
                    Id = location.Id,
                    Latitude = location.Latitude,
                    Longitude = location.Longitude
                }).ToListAsync();
            var json = ConvertToGeoJson(locationsList);
            return json;
        }

        public async Task<string> GetLocationFilterNeighbourhood(string neighbourhoodFilter)
        {
            var locationsList = await _context.Listings.Where(x =>  x.Neighbourhood == neighbourhoodFilter)
                .Select(location => new Locations
                {
                    Id = location.Id,
                    Latitude = location.Latitude,
                    Longitude = location.Longitude
                }).ToListAsync();
            var json = ConvertToGeoJson(locationsList);
            return json;
        }

        public async Task<string> GetLocationFilterReview(int reviewFilter)
        {
            var locationsList = await _context.Listings.Where(x =>  x.ReviewScoresValue == reviewFilter)
                .Select(location => new Locations
                {
                    Id = location.Id,
                    Latitude = location.Latitude,
                    Longitude = location.Longitude
                }).ToListAsync();
            var json = ConvertToGeoJson(locationsList);
            return json;
        }

        private static string ConvertToGeoJson(List<Locations> loc)
        {
            var model = new FeatureCollection();
            foreach (Locations item in loc)
            {
                item.Latitude = Double.Parse(item.Latitude.ToString().Insert(2, "."), CultureInfo.InvariantCulture);
                item.Longitude = Double.Parse(item.Longitude.ToString().Insert(1, "."), CultureInfo.InvariantCulture);
                var geom = new Point(new Position(item.Latitude, item.Longitude));
                var props = new Dictionary<string, object>
                {
                    {"id", item.Id}
                };
                var feature = new Feature(geom, props);
                model.Features.Add(feature);
            }

            var json = JsonConvert.SerializeObject(model);
            return json;
        }
    }
}