// app/api/gas-fee/route.js

import { NextResponse } from "next/server";
import { ethers } from "ethers";

// Set up environment variables for your API keys
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const GAS_LIMIT = BigInt(21000); // Standard gas limit for a simple ETH transfer

// Supported networks and their corresponding RPC URLs for Alchemy
const SUPPORTED_NETWORKS = {
  mainnet: "homestead",
  sepolia: "sepolia",
  polygon: "polygon",
  optimism: "optimism",
  arbitrum: "arbitrum",
  base: "base",
};

// Function to get a provider for the specified network
function getProvider(networkName) {
  if (!SUPPORTED_NETWORKS[networkName]) {
    throw new Error(`Unsupported network: ${networkName}`);
  }

  return new ethers.AlchemyProvider(
    SUPPORTED_NETWORKS[networkName],
    ALCHEMY_API_KEY
  );
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const networkName = searchParams.get("network");

    if (!networkName) {
      return NextResponse.json(
        { error: "Network name is required" },
        { status: 400 }
      );
    }

    if (!ALCHEMY_API_KEY) {
      const fallbackGasPriceWei = BigInt("30000000000");
      const fallbackFeeWei = fallbackGasPriceWei * GAS_LIMIT;
      return NextResponse.json({
        network: networkName,
        gasPriceWei: fallbackGasPriceWei.toString(),
        gasLimit: GAS_LIMIT.toString(),
        transactionFeeWei: fallbackFeeWei.toString(),
        fallback: true,
      });
    }

    const provider = getProvider(networkName);

    console.log(await provider.getFeeData());
    const { maxFeePerGas, gasPrice } = await provider.getFeeData();

    const effectiveGasPrice = (gasPrice * 150n) / 100n;

    const transactionFeeWei = effectiveGasPrice * GAS_LIMIT;

    return NextResponse.json({
      network: networkName,
      gasPriceWei: effectiveGasPrice.toString(),
      gasLimit: GAS_LIMIT.toString(),
      transactionFeeWei: transactionFeeWei.toString(),
    });
  } catch (error) {
    console.error("Error fetching gas fee:", error);
    const fallbackGasPriceWei = BigInt("30000000000");
    const fallbackFeeWei = fallbackGasPriceWei * GAS_LIMIT;
    return NextResponse.json({
      network: "fallback",
      gasPriceWei: fallbackGasPriceWei.toString(),
      gasLimit: GAS_LIMIT.toString(),
      transactionFeeWei: fallbackFeeWei.toString(),
      fallback: true,
    });
  }
}
