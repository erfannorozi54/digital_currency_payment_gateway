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
    // Extract network name from query
    const { searchParams } = new URL(request.url);
    const networkName = searchParams.get("network");

    if (!networkName) {
      return NextResponse.json(
        { error: "Network name is required" },
        { status: 400 }
      );
    }

    // Get provider for the specified network
    const provider = getProvider(networkName);

    // Fetch the gas price data from the provider
    console.log(await provider.getFeeData());
    const { maxFeePerGas, gasPrice } = await provider.getFeeData();

    // Use "maxFeePerGas" if available, otherwise fallback to "gasPrice"
    // const effectiveGasPrice = maxFeePerGas || gasPrice;
    const effectiveGasPrice = (gasPrice * 150n) / 100n;

    // Calculate the transaction fee in wei (gas price * gas limit)
    const transactionFeeWei = effectiveGasPrice * GAS_LIMIT;

    // Return the gas price, gas limit, and estimated transaction fee (in wei)
    return NextResponse.json({
      network: networkName,
      gasPriceWei: effectiveGasPrice.toString(), // Gas price in wei
      gasLimit: GAS_LIMIT.toString(),
      transactionFeeWei: transactionFeeWei.toString(), // Estimated transaction fee in wei
    });
  } catch (error) {
    console.error("Error fetching gas fee:", error);
    return NextResponse.json(
      { error: "Error fetching gas fee" },
      { status: 500 }
    );
  }
}
