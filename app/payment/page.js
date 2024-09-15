"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useDisconnect, useAccount } from "wagmi";
import { readContractQueryKey } from "wagmi/query";
import { QRCode } from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
export default function PaymentPage({ searchParams }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [firstLoad, setFirstLoad] = useState(true);
  const [record, setRecord] = useState({});
  const router = useRouter(); // Initialize router

  // Get the id and temporary_address from the searchParams
  const id = searchParams.id;
  const temporaryAddress = searchParams.payment_address;
  const data = new URLSearchParams();
  data.append("id", id);
  data.append("temporary_address", temporaryAddress);

  useEffect(() => {
    if (firstLoad) {
      disconnect();
      setFirstLoad(false);
    }
    fetch("/api/fetchRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        setRecord(response.record);

        console.log(response.record);
        if (Object.keys(response).length === 0) {
          throw new Error("there is not such a transaction");
        }
      })
      .catch((e) => {
        console.error(e);
        router.push("/test");
      });
  }, [isConnected]);

  return (
    <div className={styles["container"]}>
      <div className={styles["instructions"]}>
        <h2>Payment Instructions</h2>
        <p>
          Please send <strong>{record.amount_in_eth} ETH</strong> to the
          following Ethereum address:
        </p>
        <p className={styles["ethereumAddress"]}>{record.temporary_address}</p>
        <code className={styles["ethereumAddress"]}>
          {record.temporary_address && (
            <div className={styles["qrCode"]}>
              <h3>Scan QR to get ETH Address:</h3>
              <QRCodeSVG
                // bgColor="#3498db"
                level="Q"
                marginSize="5"
                style={{ margin: "20px" }}
                value={record.temporary_address}
                size={256}
              />
            </div>
          )}
        </code>
        <p>
          Use the QR code on the right to connect your wallet and complete the
          payment.
        </p>
      </div>
      <div className={styles["qrCode"]}>
        <h2>WalletConnect QR Code</h2>
        <p>Scan the QR code below to connect your wallet:</p>
        <p>{record.id}</p>
        {/* The QR code is displayed by the WalletConnect modal */}
      </div>
    </div>
  );
}

// // app/page.js (or app/some-page/page.js if it's a dynamic route)
// import db from "@/utils/db"; // assuming db is defined in lib/db.js
// import { redirect } from "next/navigation";

// export default function PaymentPage({ searchParams }) {
//   // app/records/page.js

// // Get the id and temporary_address from the searchParams
// const id = searchParams.id;
// const temporaryAddress = searchParams.payment_address;

// // Query the database to find the record matching the id and temporary_address
// const record = db
//   .prepare(
//     `
//   SELECT * FROM transactions WHERE id = ? AND temporary_address = ?
// `
//   )
//   .get(id, temporaryAddress);

// // If no record is found, redirect to the home page
// if (!record) {
//   redirect("/");
//   return null; // This return ensures no further rendering
// }

//   // If record is found, render the details
//   return (
//     <div>
//       <h1>Record Details</h1>
//       <p>
//         <strong>ID:</strong> {record.id}
//       </p>
//       <p>
//         <strong>Status:</strong> {record.status}
//       </p>
//       <p>
//         <strong>Creation Time:</strong> {record.creation_time}
//       </p>
//       <p>
//         <strong>Expiration Date:</strong> {record.expiration_date}
//       </p>
//       <p>
//         <strong>Receiver Address:</strong> {record.receiver_address}
//       </p>
//       <p>
//         <strong>Temporary Address:</strong> {record.temporary_address}
//       </p>
//       <p>
//         <strong>Private Key:</strong> {record.private_key}
//       </p>
//     </div>
//   );
// }
// app/records/page.js
// ("use client"); // Ensure it's a client-side component

// import { useEffect } from "react";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
// import { ethers } from "ethers";
// import { redirect } from "next/navigation";

// export default function RecordsPage({ searchParams }) {
//   const id = searchParams.id;
//   const temporaryAddress = searchParams.temporary_address;

//   // Placeholder for a server-side query to fetch the record
//   const record = {
//     id: id,
//     receiver_address: "0x1234567890abcdef1234567890abcdef12345678", // Mocked for example
//     temporary_address: temporaryAddress,
//     amount: "0.1", // Amount in Ether
//   };

//   useEffect(() => {
//     // If the record doesn't exist, redirect to the home page
//     if (!record) {
//       redirect("/");
//       return;
//     }

//     // Convert the amount to Wei (using ethers.js)
//     const amountInWei = ethers.parseEther(record.amount).toString();

//     // Initialize WalletConnect
//     const connector = new WalletConnect({
//       bridge: "https://bridge.walletconnect.org", // You can specify a bridge server here
//       qrcodeModal: QRCodeModal, // Display the QR code using the modal
//     });

//     // Check if a connection already exists
//     if (!connector.connected) {
//       // Create a new session
//       connector.createSession();
//     }

//     // Handle connection events
//     connector.on("connect", (error, payload) => {
//       if (error) {
//         throw error;
//       }

//       // Get provided accounts and chainId
//       const { accounts } = payload.params[0];

//       // Prepare the transaction data
//       const transaction = {
//         from: accounts[0],
//         to: record.receiver_address, // Recipient's address
//         value: amountInWei, // Transaction amount in Wei
//         gas: ethers.utils.hexlify(21000), // Gas limit (estimate)
//       };

//       // Send transaction using WalletConnect
//       connector
//         .sendTransaction(transaction)
//         .then((result) => {
//           console.log("Transaction sent:", result);
//           // Handle the result (transaction hash)
//         })
//         .catch((error) => {
//           console.error("Transaction failed:", error);
//         });
//     });

//     // Handle disconnect event
//     connector.on("disconnect", (error, payload) => {
//       if (error) {
//         throw error;
//       }
//       console.log("Disconnected:", payload);
//     });
//   }, [id, temporaryAddress, record]);

//   return (
//     <div>
//       <h1>Scan to Send {record.amount} ETH</h1>
//       <p>Receiver Address: {record.receiver_address}</p>
//       <p>Amount: {record.amount} ETH</p>
//     </div>
//   );
// }
