"use server";
import { formSchema } from "@/utils/utils";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { bigint, z } from "zod";
import { Wallet } from "ethers";

// Assume a conversion rate for ETH to Rial for demonstration (1 ETH = 1,500,000,000 Rials)
// In real-world applications, you should fetch the conversion rate from a reliable source
// const ETH_TO_RIAL_CONVERSION_RATE = 1500000000;

export async function someAction(prevState, formData) {
  let info;
  let ETH_TO_TOMAN_CONVERSION_RATE;
  try {
    const priceResponse = await fetch(
      "http://localhost:3000/api/fetchPrice",
      {
        cache: "no-store",
      }
    );
    const priceData = await priceResponse.json();
    ETH_TO_TOMAN_CONVERSION_RATE = parseInt(priceData["data"]) / 10;
    console.log("Fetched ETH price:", ETH_TO_TOMAN_CONVERSION_RATE);
  } catch (error) {
    console.error("Error fetching the price:", error);
    // Use fallback price if API fails
    ETH_TO_TOMAN_CONVERSION_RATE = 28690000; // ~286,900 Toman
  }
  let transactionFee;
  try {
    const feeResponse = await fetch(
      "http://localhost:3000/api/fetchGasFee?network=mainnet",
      {
        cache: "no-store",
      }
    );
    const feeData = await feeResponse.json();
    transactionFee = BigInt(feeData["transactionFeeWei"]);
    console.log("Fetched transaction fee:", transactionFee);
  } catch (error) {
    console.error("Error fetching gas fee:", error);
    // Use fallback gas fee if API fails (approximate mainnet gas fee)
    transactionFee = BigInt("21000000000000000"); // ~0.021 ETH
  }
  const { walletAddress: temporaryAddress, privateKey } =
    await generateWallet();
  try {
    // Get form values
    const walletAddress = formData.get("walletAddress");
    const amountValue = formData.get("amount");
    
    console.log("Received form data - walletAddress:", walletAddress, "amount:", amountValue);
    
    // Validate amount is not empty
    if (!amountValue || amountValue === "" || amountValue === "0") {
      return {
        message: "لطفا مبلغ را وارد کنید",
      };
    }
    
    const parsedAmount = parseInt(amountValue);
    
    // Check if parsing was successful
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return {
        message: "مبلغ وارد شده معتبر نیست",
      };
    }
    
    // Parse and validate the form data using Zod
    const validatedData = formSchema.parse({
      walletAddress: walletAddress,
      amount: parsedAmount, // Amount in Toman
    });
    
    // Calculate the equivalent amount in ETH
    const amountInToman = validatedData.amount; // Amount in Toman from the form
    const amountInWei =
      transactionFee +
      (BigInt(amountInToman) * BigInt(1e18)) /
        BigInt(ETH_TO_TOMAN_CONVERSION_RATE);
    const amountInEth = parseFloat((Number(amountInWei) / 1e18).toFixed(5)); // Convert Toman to ETH
    console.log(amountInEth);
    console.log(ETH_TO_TOMAN_CONVERSION_RATE);

    // Insert a new transaction record
    const stmt = db.prepare(`
      INSERT INTO transactions (status, creation_time, expiration_date, receiver_address, temporary_address, private_key, amount_in_toman, amount_in_eth, amount_in_wei, transfer_fee_in_wei)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Sample data for temporary fields
    const creationTime = new Date().toISOString(); // Creation time (now)
    const expirationDate = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(); // Expiration 7 days later

    // Execute the insertion
    info = stmt.run(
      "Pending", // Status
      creationTime,
      expirationDate,
      validatedData.walletAddress, // Receiver address from form
      temporaryAddress,
      privateKey,
      amountInToman, // Amount in Toman (from form)
      amountInEth, // Amount in ETH (calculated)
      amountInWei.toString(),
      transactionFee.toString()
    );
    console.log("Validated data and record inserted:", validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errorMessage = error.errors.map(e => e.message).join(", ");
      return { 
        message: `خطای اعتبارسنجی: ${errorMessage}`,
      };
    }

    // Handle other server-side errors
    console.error("Error inserting record:", error);
    return { 
      message: "خطا در ایجاد تراکنش. لطفا دوباره تلاش کنید",
    };
  }

  const id = info.lastInsertRowid;
  console.log(id);

  // Redirect after successful submission
  redirect(`/payment?id=${id}&payment_address=${temporaryAddress}`);
}

// Server action to generate a random Ethereum wallet
async function generateWallet() {
  // Create a new random Ethereum wallet
  const wallet = Wallet.createRandom();

  // Extract the address and private key
  const walletAddress = wallet.address;
  const privateKey = wallet.privateKey;

  // You can store the wallet details in a database or perform any other actions here
  console.log("New Ethereum Wallet:", walletAddress, privateKey);

  // Return the wallet details
  return {
    success: true,
    walletAddress,
    privateKey,
  };
}
