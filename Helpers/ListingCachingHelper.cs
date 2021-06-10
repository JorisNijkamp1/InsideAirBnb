using System;
using System.Diagnostics;
using StackExchange.Redis;

namespace InsideAirBnb.Helpers
{
    public class ListingCachingHelper : IListingCachingHelper
    {
        private readonly IDatabase _cache;
        private const string KEY = "listings";
        private const int EXPIRE = 30;

        public ListingCachingHelper(IConnectionMultiplexer connectionMultiplexer)
        {
            _cache = connectionMultiplexer.GetDatabase();
        }

        public string GetCachedLocations()
        {
            var cache = _cache.StringGet(KEY);
            return cache;
        }
        
        public bool CacheExists()
        {
            return _cache.KeyExists(KEY);
        }

        public void SetCachedLocations(string locations)
        {
            _cache.StringSet(KEY, locations);
            _cache.KeyExpire(KEY, DateTime.Now.AddSeconds(EXPIRE));
        }
    }
}