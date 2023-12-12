"use client";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <main className='flex flex-col min-h-screen bg-black items-center'>
      <div className="pt-24">
        <div className="h-[60px] w-[465px] gap-4">
          <ConnectWalletButton>
            {"BUY PACKS"}
          </ConnectWalletButton>
        </div>
        </div>
    </main>
  );
}
