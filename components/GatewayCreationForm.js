"use client";
import styles from "./GatewayCreationForm.module.css";
import { someAction } from "@/actions/createTransaction";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";
import { useAccount } from "wagmi";

export function GatewayCreationForm() {
  const { pending } = useFormStatus();
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(someAction, initialState);
  const { address, isConnected } = useAccount();
  const [autoWalletToggle, setAutoWalletToggle] = useState(false);
  function handleToggle(event) {
    setAutoWalletToggle((previous) => !previous);
  }

  return (
    <>
      <form action={formAction}>
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
            disabled={autoWalletToggle}
            placeholder={` ${
              !autoWalletToggle
                ? "آدرس کیف  پول گیرنده را وارد کنید"
                : !isConnected
                ? "لطفا کیف پول خود را متصل کنید"
                : address
            }`}
          />
        </div>
        {/* Conditionally include a hidden input to send the address if wallet is connected and autoWalletToggle is true */}
        {autoWalletToggle && isConnected && (
          <input type="hidden" name="walletAddress" value={address} />
        )}
        <div className={styles["form-group"]}>
          <label htmlFor="amount">مبلغ واریزی به تومان</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="۰ تومان"
          />
        </div>
        <p>{state?.message}</p>
        <SubmitButton />
      </form>
    </>
  );
}
