export function getConfig() {
  return {
    drawingAddress: process.env.NEXT_PUBLIC_DRAWING_ADDRESS,
    nftAddress:
      process.env.NEXT_PUBLIC_NFT_ADDRESS ||
      '0x7B17d3d83189FFAF1Eb4F3fc9Ba00992a3c1b486',
    vrfAddress:
      process.env.NEXT_PUBLIC_VRF_ADDRESS ||
      '0x2eD832Ba664535e5886b75D64C46EB9a228C2610',
    vrfManagerAddress:
      process.env.NEXT_PUBLIC_VRF_MANAGER_ADDRESS ||
      '0xd3f8FFdA0fd9A2eB5D3acF7c5E9ae4334f0A2Add',
    marketplaceSenderAddress:
      process.env.NEXT_PUBLIC_MARKETPLACE_SENDER_ADDRESS ||
      '0x19121241f9F3Da2813b5B8C0E2Bc5aEA9Ec17aF5',
    marketplaceReceiverAddress:
      process.env.NEXT_PUBLIC_MARKETPLACE_RECEIVER_ADDRESS ||
      '0x1d163C7Fb8925a88EB0AC4042868F8248d60a107',
    avaxUsdtAddress:
      process.env.NEXT_PUBLIC_AVAX_USDT_ADDRESS ||
      '0xae940284e4eB37Fec1F1Bf1D7f297EB1f07f2B26',
    ethUsdtAddress:
      process.env.NEXT_PUBLIC_ETH_USDT_ADDRESS ||
      '0x4E85938b8cba54F4726A649b727c15Cca379b146',
    packId: Number(process.env.NEXT_PUBLIC_PACK_ID || 0),
    specialPackId: Number(process.env.NEXT_PUBLIC_SPECIAL_PACK_ID || 0),
    drawingPoolId: Number(process.env.NEXT_PUBLIC_DRAWING_POOL_ID || 0),
    specialDrawingPoolId: Number(
      process.env.NEXT_PUBLIC_SPECIAL_DRAWING_POOL_ID || 0
    ),
    automationUrl: process.env.NEXT_PUBLIC_AUTOMATION_URL,
    vrfUrl: process.env.NEXT_PUBLIC_VRF_URL,
    openseaCollectionUrl: process.env.NEXT_PUBLIC_OPENSEA_COLLECTION_URL,
  };
}
