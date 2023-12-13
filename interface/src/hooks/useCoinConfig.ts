import { useAddresses } from "@/hooks/useAddresses";
import { parseAbi } from "viem";
import { useNetwork } from "wagmi";
import { useMemo } from "react";
import {getSupportedChainId} from "@/common";
export default function useCoinConfig() {
  const { avaxUsdtAddress, ethUsdtAddress,opbnbUsdtAddress } = useAddresses();
  const { chain } = useNetwork();
  const usdtAddress = useMemo(() => {
    switch (chain?.id || getSupportedChainId()) {
      case 43113:
        return avaxUsdtAddress;
      case 5611:
        return opbnbUsdtAddress;
      case 11155111:
        return ethUsdtAddress;
      default:
        return avaxUsdtAddress;
    }
  }, [chain]);
  return {
    usdtAddress: usdtAddress,
    abi: parseAbi([
      "function allowance(address owner, address spender) returns (uint256)",
      "function approve(address spender, uint256 value) returns (bool)",
    ]),
  };
}
