'use client';
import {PrimaryButton} from "@/components/Button";

export default function Home() {
  return (
      <main className='flex min-h-screen flex-col items-center justify-center bg-[#0c0e12] p-24'>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-[50px] w-[500px]'>
            <PrimaryButton>
              PLAYERS - BUY PACKS
            </PrimaryButton>
          </div>
          <div className='h-[50px] w-[500px]'>
            <PrimaryButton>
              GAME OWNER - SETUP DRAWING POOLS
            </PrimaryButton>
          </div>
        </div>
      </main>
  );
}
