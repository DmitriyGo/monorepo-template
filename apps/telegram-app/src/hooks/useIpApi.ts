import { useEffect, useState } from 'react';

import { IpinfoApi } from '@/api/ipinfo';
import { restrictedCountries } from '@/constants/restrictedCountries';

export const useIpInfo = () => {
  const [loading, setLoading] = useState(true);
  const [restricted, setRestricted] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  });

  useEffect(() => {
    const abortController = new AbortController();

    const fetchIpInfo = async () => {
      try {
        const { data } = await IpinfoApi.getIpinfoStatus(abortController.signal);

        console.log('data ==>', data);

        const country = data.country;
        const vpn = data.privacy.vpn || false;

        if (vpn) {
          setRestricted({
            status: true,
            message:
              "VPN detected. We're sorry but this app is not accessible for VPN users. Please disable your VPN and reload.",
          });
        } else if (restrictedCountries.includes(country.toLowerCase())) {
          setRestricted({
            status: true,
            message:
              'Access Restricted. This app is only accessible to purchasers outside the US and other restricted jurisdictions.',
          });
        }
      } catch (e) {
        if (!abortController.signal.aborted) {
          console.error("Couldn't fetch IP information:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();

    return () => {
      abortController.abort();
    };
  }, []);

  return { loading, ...restricted };
};
