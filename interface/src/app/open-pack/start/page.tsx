"use client";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import {useCallback, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {useTokenList} from "@/hooks/useTokenList";
import {NFTProfile} from "@/components/NFTProfile";

export default function Page() {
  const {tokenList}=useTokenList();
  console.log(tokenList);
  const [selectedToken, setSelectedToken] = useState<number>(0);
  useEffect(() => {
      if (tokenList.length > 0){
        setInterval(() => {
        console.log('setInterval',tokenList);
        setSelectedToken(Math.floor(Math.random() * tokenList.length));
      },2000);
      }
  }, [tokenList]);
  console.log('selectedToken',selectedToken);
  console.log('tokenSelected',tokenList[selectedToken]);
  return (
    <main className='flex flex-col min-h-screen bg-black items-center'>
      <div className="pt-24 flex flex-col items-center">
        <div className='w-[300px]'>
          <NFTProfile tokenId={tokenList[selectedToken] || BigInt(0)} />
        </div>
        <div className="h-[60px] w-[465px] gap-4">
          <ConnectWalletButton>
            {"BUY PACKS"}
          </ConnectWalletButton>
        </div>
        </div>
    </main>
  );
}
