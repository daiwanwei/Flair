'use client';
import { PrimaryButton } from '@/components/Button';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProbabilityTree from '@/components/ProbabilityTree';
import { PoolProcessStatus } from '@/types';
import { usePoolProcessStatusStore } from '@/stores/poolProcessStatus';

export default function Page() {
  const { status, updateStatus } = usePoolProcessStatusStore();
  const router = useRouter();
  const handleNextStep = () => {
    router.push('/');
  };
  useEffect(() => {
    if (status !== PoolProcessStatus.Done) {
      updateStatus(PoolProcessStatus.Done);
    }
  }, [status]);
  return (
    <div className='flex flex-col justify-start'>
      <div className='mt-[38px] flex w-[950px] flex-col gap-4'>
        <ProbabilityTree />
      </div>
      <div className='mt-[23px] w-[300px]'>
        <PrimaryButton onClick={handleNextStep}>Finish Setup</PrimaryButton>
      </div>
    </div>
  );
}
