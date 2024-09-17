"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  useDisconnect,
  useAccount,
  useConnect,
  useSendTransaction,
} from "wagmi";

import { QRCodeSVG } from "qrcode.react";
import { injected } from "wagmi/connectors";
// import { mainnet, sepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

const connector1 = walletConnect({
  projectId: "667c0496a3df56d1a72a79853efe83b7",
  qrModalOptions: {
    themeMode: "dark",
  },
  showQrModal: false,
});

import { useRouter } from "next/navigation";
export default function PaymentPage({ searchParams }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [firstLoad, setFirstLoad] = useState(true);
  const [record, setRecord] = useState({});
  const [wcUri, setWcUri] = useState("");
  const [temp, setTemp] = useState();

  const router = useRouter(); // Initialize router
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { connect, connectors } = useConnect({
    mutation: {
      onSuccess(data) {
        setTemp(data);
        console.log(record.temporary_address);
        console.log(record.amount_in_wei);
        sendTransaction({ to: data.accounts[0], value: record.amount_in_wei });
      },
    },
  });
  // Get the id and temporary_address from the searchParams
  const id = searchParams.id;
  const temporaryAddress = searchParams.payment_address;
  const data = new URLSearchParams();
  data.append("id", id);
  data.append("temporary_address", temporaryAddress);

  useEffect(() => {
    function walletConnectQrCodeProvider() {
      connectors[0].getProvider().then((provider) => {
        provider.on("display_uri", (uri) => {
          console.log(uri);
          setWcUri(uri);
        });
      });
      connect({ connector: connectors[0] });
      // connectors[0].connect();
    }
    if (firstLoad) {
      disconnect();
      setFirstLoad(false);
      setTimeout(walletConnectQrCodeProvider, 2000);
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

      <button
        onClick={() => {
          console.log("asjfnsd");
          connect(connector1);
        }}
      >
        connect
      </button>
      <div className={styles["instructions"]}>
        <h2>WalletConnect QR Code</h2>
        <p>Scan the QR code below to connect your wallet:</p>
        {!wcUri ? (
          <p>Loading</p>
        ) : !isConnected ? (
          <div>
            <code className={styles["ethereumAddress"]}>
              <div className={styles["qrCode"]}>
                <h3>Scan QR to connect:</h3>
                <QRCodeSVG
                  level="Q"
                  marginSize="5"
                  style={{ margin: "20px" }}
                  value={wcUri}
                  size={256}
                />
              </div>
            </code>
          </div>
        ) : isPending ? (
          <p>waiting for transaction to be accepted</p>
        ) : (
          <div>
            <h2>Connected Wallet Address:</h2>
            <p>{address}</p>
          </div>
        )}
      </div>
    </div>
  );
}
