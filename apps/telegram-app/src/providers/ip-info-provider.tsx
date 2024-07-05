import { Spinner } from '@repo/ui/spinner';
import type { ReactNode } from 'react';

import { useIpInfo } from '@/hooks/useIpApi';

export const IpInfoProvider = ({ children }: { children: ReactNode }) => {
  const { loading, status, message } = useIpInfo();

  if (!loading && status) {
    return <div>{message}</div>;
  }

  console.log('123');

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="fill-slate-700" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
