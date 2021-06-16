using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace InsideAirBnb.Helpers
{
    public class ListingCachingHelper : IListingCachingHelper
    {
        private readonly IDatabase _cache;
        private const int EXPIRE = 30;

        public ListingCachingHelper(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public bool CacheExists(string KEY)
        {
            return _cache.KeyExists(KEY);
        }
        
        public string GetCachedLocations(string KEY)
        {
            var cache = _cache.StringGet(KEY);
            return cache;
        }

        public void SetCachedLocations(string locations, string KEY)
        {
            _cache.StringSet(KEY, locations);
            _cache.KeyExpire(KEY, DateTime.Now.AddSeconds(EXPIRE));
        }

        public void SetCachedAverageInfo(IEnumerable<ChartAverageNeighbourhood> chart, string KEY)
        {
            _cache.SetAddAsync(KEY, chart.Select(x => (RedisValue)JsonConvert.SerializeObject(x)).ToArray());
            _cache.KeyExpire(KEY, DateTime.Now.AddMinutes(EXPIRE));
        }

        public async Task<IEnumerable<ChartAverageNeighbourhood>> GetCachedAverageInfo(string KEY)
        {
            var cache = await _cache.SetMembersAsync(KEY);
            return cache.Select(x =>
            {
                var i = JsonConvert.DeserializeObject(x, typeof(ChartAverageNeighbourhood));
                return (ChartAverageNeighbourhood) i;
            }).ToList();
        }

        public async Task<ActionResult<IEnumerable<Neighbourhood>>> GetCachedNeighbourhoods(string KEY)
        {
            var cache = await _cache.SetMembersAsync(KEY);
            return cache.Select(x =>
            {
                var i = JsonConvert.DeserializeObject(x, typeof(Neighbourhood));
                return (Neighbourhood) i;
            }).ToList();
        }

        public void SetCachedNeighbourhoods(List<Neighbourhood> neighbourhoods, string KEY)
        {
            _cache.SetAddAsync(KEY, neighbourhoods.Select(x => (RedisValue)JsonConvert.SerializeObject(x)).ToArray());
            _cache.KeyExpire(KEY, DateTime.Now.AddMinutes(EXPIRE));
        }
    }
}