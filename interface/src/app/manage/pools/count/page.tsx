'use client';
import { PrimaryButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { usePoolProcessStatusStore } from '@/stores/poolProcessStatus';
import React, { useCallback, useEffect } from 'react';
import { PoolProcessStatus, TOKEN_LIST } from '@/types';
import SetPoolCountSection from '@/components/SetPoolCountSection';

export default function Page() {
  const { status, updateStatus } = usePoolProcessStatusStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLoading = useCallback((l: boolean) => {
    setIsLoading(l);
  }, []);
  const handleNextStep = () => {
    router.push('/manage/pools/createUnit');
  };
  useEffect(() => {
    if (status !== PoolProcessStatus.SelectNFT) {
      updateStatus(PoolProcessStatus.SelectNFT);
    }
  }, [status]);
  return (
    <div className='flex flex-col justify-start'>
      <div className='mt-[38px] w-[950px]'>
        <SetPoolCountSection onLoading={handleLoading} />
      </div>
      <div className='mt-[23px] w-[300px]'>
        <PrimaryButton loading={isLoading} onClick={handleNextStep}>
          Next Step
        </PrimaryButton>
      </div>
    </div>
  );
}
