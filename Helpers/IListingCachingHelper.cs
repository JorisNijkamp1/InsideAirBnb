namespace InsideAirBnb.Helpers
{
    public interface IListingCachingHelper
    {
        bool CacheExists();
        void SetCachedLocations(string locations);
        string GetCachedLocations();
    }
}