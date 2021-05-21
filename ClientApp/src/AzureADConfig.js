import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
    tenant: '148557d6-6224-4786-a040-c97e6c391f34',
    clientId: '5307daf7-fec8-4a85-9f63-d2ef7b0dc118',
    endpoints: {
        api: 'https://graph.microsoft.com/',
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig, adalConfig.endpoints.api);
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);