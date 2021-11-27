export const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};   

const IP_API_URL = 'http://ip-api.com/json/?lang=ru/';

export const fetchIP = () => fetchData(IP_API_URL);