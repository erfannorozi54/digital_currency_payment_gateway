"use client";
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import {
  useDisconnect,
  useAccount,
  useConnect,
  useSendTransaction,
} from "wagmi";

import { QRCodeSVG } from "qrcode.react";

import { useRouter } from "next/navigation";
import { updateTransactionStatus } from "@/utils/utils";
export default function PaymentPage({ searchParams }) {
  const { address, isConnected, chain } = useAccount();
  const { disconnect, connectors: c } = useDisconnect();
  const firstLoad = useRef(true); // Use ref instead of state
  const [record, setRecord] = useState({});
  const [wcUri, setWcUri] = useState("");

  const router = useRouter(); // Initialize router
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { connect, connectors } = useConnect({
    mutation: {
      onSuccess(data) {
        console.log(record.temporary_address);
        console.log(record.amount_in_wei);
        console.log(chain.name);
        console.log(chain);
        console.log(data);
        console.log(data.accounts[0]);
        console.log("shshshshshs");
        console.log(record.id);
        setTimeout(() => {
          console.log("bbbbbbbb");
          sendTransaction(
            {
              to: record.temporary_address,
              value: record.amount_in_wei,
              chainName: chain.name,
              recordId: record.id,
            },
            {
              onSuccess(data, variables) {
                console.log("Transaction successful:", data);
                console.log("chain is:", variables.to);
                console.log("chain is:", variables.chainName);
                console.log("chain is:", variables.recordId);
                // Update the transaction status to "done" in the database via API
                updateTransactionStatus(
                  variables.recordId,
                  "done",
                  data,
                  variables.chainName.toLowerCase()
                );
              },
              onError(error) {
                console.error("Transaction failed:", error);
                // Update the transaction status to "failed" in the database via API
                // updateTransactionStatus(record.id, "failed");
              },
            }
          );
          console.log("bbbbbbbb");
        }, 1);
        console.log(data.accounts[0]);
        console.log("fffffffffff");
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
    console.log("---------");
    console.log(c);
    console.log(connectors);
    console.log("---------");
    console.log("useEffect");
    console.log(isConnected);
    if (firstLoad.current) {
      console.log("in iffffff");
      disconnect();
      firstLoad.current = false; // Set ref to false after first load
      setTimeout(() => {
        connectors[0].getProvider().then((provider) => {
          provider.on("display_uri", (uri) => {
            console.log(uri);
            setWcUri(uri);
          });
        });
        connect({ connector: connectors[0] });
      }, 2000);
      fetch("/api/fetchRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("shit");
          setRecord(response.record);
          if (Object.keys(response).length === 0) {
            throw new Error("There is not such a transaction");
          }
          console.log("shit22");
        })
        .catch((e) => {
          console.error(e);
          router.push("/test");
        });
    }
    console.log("useEffect finished");
  }, [isConnected]);

  return (
    <div className={styles.pageWrapper}>
      {record.status === "Pending" ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>اتمام پرداخت</h1>
            <p className={styles.pageSubtitle}>
              برای اتمام تراکنش، مراحل زیر را دنبال کنید
            </p>
          </div>

          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>💰</span>
                </div>
                <h2>دستورالعمل پرداخت</h2>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.infoText}>
                  لطفا <strong className={styles.highlight}>{record.amount_in_eth} ETH</strong> را به آدرس زیر ارسال کنید:
                </p>
                <div className={styles.addressBox}>
                  <code className={styles.address}>{record.temporary_address}</code>
                </div>
                {record.temporary_address && (
                  <div className={styles.qrSection}>
                    <h3 className={styles.qrTitle}>اسکن QR برای دریافت آدرس:</h3>
                    <div className={styles.qrWrapper}>
                      <QRCodeSVG
                        level="Q"
                        marginSize={2}
                        value={record.temporary_address}
                        size={200}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>🔗</span>
                </div>
                <h2>اتصال کیف پول</h2>
              </div>
              <div className={styles.cardBody}>
                {!wcUri ? (
                  <div className={styles.loadingState}>
                    <div className={styles.loadingSpinner}></div>
                    <p>در حال بارگذاری...</p>
                  </div>
                ) : !isConnected ? (
                  <div className={styles.qrSection}>
                    <h3 className={styles.qrTitle}>اسکن QR برای اتصال:</h3>
                    <div className={styles.qrWrapper}>
                      <QRCodeSVG
                        level="Q"
                        marginSize={2}
                        value={wcUri}
                        size={200}
                      />
                    </div>
                    <p className={styles.infoText}>
                      با اسکن این کد، کیف پول خود را متصل کنید
                    </p>
                  </div>
                ) : isPending ? (
                  <div className={styles.pendingState}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.statusText}>در انتظار تایید تراکنش...</p>
                  </div>
                ) : (
                  <div className={styles.connectedState}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>کیف پول متصل شد</h3>
                    <div className={styles.addressBox}>
                      <code className={styles.connectedAddress}>{address}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : record.status === "done" ? (
        <div className={styles.statusContainer}>
          <div className={styles.successCard}>
            <div className={styles.statusIcon}>✓</div>
            <h1 className={styles.statusTitle}>تراکنش موفقیت‌آمیز بود</h1>
            <p className={styles.statusMessage}>پرداخت شما با موفقیت انجام شد</p>
          </div>
        </div>
      ) : (
        <div className={styles.statusContainer}>
          <div className={styles.errorCard}>
            <div className={styles.statusIcon}>✕</div>
            <h1 className={styles.statusTitle}>تراکنش ناموفق بود</h1>
            <p className={styles.statusMessage}>متاسفانه پرداخت انجام نشد</p>
          </div>
        </div>
      )}
    </div>
  );
}
