using System;
using System.Collections.Generic;
using System.Globalization;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Newtonsoft.Json;

namespace InsideAirBnb.Helpers
{
    public class LocationsConverter
    {
        public string ConvertToGeoJson(List<Locations> loc)
        {
            var model = new FeatureCollection();
            foreach (Locations item in loc)
            {
                item.Latitude = Double.Parse(item.Latitude.ToString().Insert(2, "."), CultureInfo.InvariantCulture);
                item.Longitude = Double.Parse(item.Longitude.ToString().Insert(1, "."), CultureInfo.InvariantCulture);
                var geom = new Point(new Position(item.Latitude, item.Longitude));
                var props = new Dictionary<string, object>
                {
                    { "id", item.Id }
                };
                var feature = new Feature(geom, props);
                model.Features.Add(feature);
            }
            string json = JsonConvert.SerializeObject(model);
            return json;
        }
    }
}