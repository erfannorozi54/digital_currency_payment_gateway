"use server";
import { formSchema } from "@/utils/utils";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Wallet } from "ethers";

// Assume a conversion rate for ETH to Rial for demonstration (1 ETH = 1,500,000,000 Rials)
// In real-world applications, you should fetch the conversion rate from a reliable source
// const ETH_TO_RIAL_CONVERSION_RATE = 1500000000;

export async function someAction(prevState, formData) {
  let info;
  await new Promise((res, rej) => {
    setTimeout(res, 5000); // Simulating async work
  });
  const ETH_TO_TOMAN_CONVERSION_RATE = await fetch(
    "http://localhost:3000/api/fetchPrice",
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return parseInt(data["data"]) / 10;
    })
    .catch((error) => {
      console.error("Error fetching the price:", error);
    });
  const { walletAddress: temporaryAddress, privateKey } =
    await generateWallet();
  try {
    // Parse and validate the form data using Zod
    const validatedData = formSchema.parse({
      walletAddress: formData.get("walletAddress"),
      amount: parseInt(formData.get("amount")), // Amount in Toman
    });

    // Calculate the equivalent amount in ETH
    const amountInToman = validatedData.amount; // Amount in Toman from the form
    const amountInEth = parseFloat(
      (
        ((parseFloat(amountInToman) / ETH_TO_TOMAN_CONVERSION_RATE) * 102) /
        100
      ).toFixed(5)
    ); // Convert Toman to ETH
    console.log(amountInEth);
    console.log(ETH_TO_TOMAN_CONVERSION_RATE);

    // Insert a new transaction record
    const stmt = db.prepare(`
      INSERT INTO transactions (status, creation_time, expiration_date, receiver_address, temporary_address, private_key, amount_in_toman, amount_in_eth)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
      amountInEth // Amount in ETH (calculated)
    );
    console.log("Validated data and record inserted:", validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return { success: false, errors: error.errors };
    }

    // Handle other server-side errors
    console.error("Error inserting record:", error);
    return { success: false, message: "Internal server error" };
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
