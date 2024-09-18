// Import better-sqlite3 for server-side use
import db from "@/utils/db";
import { ethers } from "ethers";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SUPPORTED_NETWORKS = {
  mainnet: "homestead",
  sepolia: "sepolia",
  polygon: "polygon",
  optimism: "optimism",
  arbitrum: "arbitrum",
  base: "base",
};
function getTransactionRecord(transactionId) {
  try {
    const stmt = db.prepare(`
        SELECT * FROM transactions WHERE id = ?;
      `);
    const transaction = stmt.get(transactionId);
    return transaction;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function validateTransactionHash(
  transactionHash,
  receiver,
  amountInWei,
  network
) {
  const provider = new ethers.AlchemyProvider(
    SUPPORTED_NETWORKS[network],
    ALCHEMY_API_KEY
  ); // Use your RPC provider
  try {
    console.log("fffffffff");
    console.log(transactionHash);

    const tx = await provider.getTransaction(transactionHash);
    console.log(tx);
    // Check if the transaction exists and matches the receiver and amount
    if (
      tx &&
      tx.to.toLowerCase() === receiver.toLowerCase() &&
      tx.value.toString() === amountInWei
    ) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error validating transaction:", err);
    return false;
  }
}

// Function to update the transaction status in better-sqlite3
function updateTransactionStatus(transactionId, status, transactionHash) {
  try {
    const stmt = db.prepare(`
      UPDATE transactions
      SET status = ?, transaction_hash = ?
      WHERE id = ?;
    `);

    stmt.run(status, transactionHash, transactionId);
    return {
      success: true,
      message: `Transaction with ID ${transactionId} updated successfully.`,
    };
  } catch (err) {
    return {
      success: false,
      message: `Error updating transaction: ${err.message}`,
    };
  }
}

export async function POST(request) {
  console.log("transactionId");

  const { transactionId, transactionHash, network } = await request.json();
  console.log("heeeeyyyy!:", transactionHash);

  // Fetch the transaction record from the database
  const record = getTransactionRecord(transactionId);
  console.log(record);

  if (!record) {
    return new Response(
      JSON.stringify({
        success: false,
        message: `Transaction with ID ${transactionId} not found.`,
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Validate the transaction hash
  const isValid = await validateTransactionHash(
    transactionHash,
    record.receiver_address,
    record.amount_in_wei,
    network
  );

  if (!isValid) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Transaction hash is invalid or does not match the record.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // If validation passes, update the transaction status
  const result = updateTransactionStatus(
    transactionId,
    "done",
    transactionHash
  );

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: { "Content-Type": "application/json" },
  });
}
