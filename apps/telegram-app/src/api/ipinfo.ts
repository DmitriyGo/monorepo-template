import axios from 'axios';

class IpinfoApiService {
  host = 'https://ipinfo.io';

  async getIpinfoStatus(signal?: AbortSignal) {
    const url = new URL('/json', this.host);
    url.searchParams.append('token', import.meta.env.VITE_IPINFO_KEY);

    return axios.get(url.href, { signal });
  }
}

export const IpinfoApi = new IpinfoApiService();
