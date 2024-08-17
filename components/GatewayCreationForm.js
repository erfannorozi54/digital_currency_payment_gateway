"use client";
import styles from "./GatewayCreationForm.module.css";
import { useState } from "react";
import { useAccount } from "wagmi";

export function GatewayCreationForm() {
  const { address, isConnected } = useAccount();
  const [autoWalletToggle, setAutoWalletToggle] = useState(false);
  function handleToggle(event) {
    setAutoWalletToggle((previous) => !previous);
  }
  console.log(isConnected);
  return (
    <>
      <form>
        <div className={styles["toggle-container"]}>
          <label className={styles["toggle-label"]} htmlFor="walletToggle">
            آدرس گیرنده با اتصال به کیف پول خوانده شود
          </label>
          <label className={styles["toggle-switch"]}>
            <input type="checkbox" id="walletToggle" onChange={handleToggle} />
            <span className={styles["slider"]}></span>
          </label>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="walletAddress">آدرس کیف پول گیرنده</label>
          <input
            type="text"
            className={` ${autoWalletToggle ? styles["input-disabled"] : ""}`}
            id="walletAddress"
            name="walletAddress"
            placeholder={` ${
              !autoWalletToggle
                ? "آدرس کیف  پول گیرنده را وارد کنید"
                : !isConnected
                ? "لطفا کیف پول خود را متصل کنید"
                : address
            }`}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="amount">مقدار اتریوم واریزی</label>
          <input type="number" id="amount" name="amount" placeholder="0.00" />
        </div>
        <button type="submit" className={styles["payment-button"]}>
          ساخت درگاه پرداخت
        </button>
      </form>
    </>
  );
}
