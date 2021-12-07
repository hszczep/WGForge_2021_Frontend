import { IRequestConfig } from '../models/request-config.model';
import { DEFAULT_ERROR_MESSAGE, MAIN_API_URLS, METHODS } from './services.constants';

const generateHeaders = (token: string) => ({
  Authorization: token ? `Bearer ${token}` : null,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const generateRequestConfig = ({ method, token, params }: IRequestConfig) => {
  switch (method) {
    case 'GET':
      return {
        method,
        headers: generateHeaders(token),
      };
    case 'POST':
      return {
        method,
        headers: generateHeaders(token),
        body: JSON.stringify(params),
      };
    case 'PUT':
      return {
        method,
        headers: generateHeaders(token),
      };
    default:
      return null;
  }
};

const getEndpointUrl = (endpointUrl: string) => `${MAIN_API_URLS.BASE}${endpointUrl}`;

const fetchMainAPI = async (endpointUrl: string, requestConfig: IRequestConfig) => {
  const response = await fetch(getEndpointUrl(endpointUrl), generateRequestConfig(requestConfig));
  const json = await response.json();
  if (!response.ok) throw new Error((await json.message) || DEFAULT_ERROR_MESSAGE);
  return json;
};

export const getResource = (endpointUrl: string, { token }: IRequestConfig) => {
  const resource = fetchMainAPI(endpointUrl, { method: METHODS.GET, token });
  return resource;
};

export const postResourse = (endpointUrl: string, { token, params }: IRequestConfig) => {
  const resource = fetchMainAPI(endpointUrl, { method: METHODS.POST, token, params });
  return resource;
};

export const putResourse = (endpointUrl: string, { token }: IRequestConfig) => {
  const resource = fetchMainAPI(endpointUrl, { method: METHODS.PUT, token });
  return resource;
};
