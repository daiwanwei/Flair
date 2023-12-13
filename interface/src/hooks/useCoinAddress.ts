import { Address } from "wagmi";
import { useAddresses } from "@/hooks/useAddresses";

export function useCoinAddress(coin: string, chainId: number): Address {
  const { avaxUsdtAddress, ethUsdtAddress } = useAddresses();
  switch (chainId) {
    case 43113:
      return avaxUsdtAddress;
    case 11155111:
      return ethUsdtAddress;
    case 5611:
        return ethUsdtAddress;
    default:
      return avaxUsdtAddress;
  }
}
