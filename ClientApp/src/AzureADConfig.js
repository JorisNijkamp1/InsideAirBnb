import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
    tenant: '148557d6-6224-4786-a040-c97e6c391f34',
    clientId: 'c10c71b9-5805-448f-8210-bccb71d46ed1',
    endpoints: {
        api: 'https://graph.microsoft.com/',
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);