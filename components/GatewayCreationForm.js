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
  const [amount, setAmount] = useState("");
  const [rawAmount, setRawAmount] = useState("");
  
  function handleToggle(event) {
    setAutoWalletToggle((previous) => !previous);
  }
  
  function handleAmountChange(e) {
    const inputValue = e.target.value;
    
    // Convert Persian/Arabic digits to English and remove non-digits and separators
    const persianToEnglish = (str) => {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
      const englishDigits = '0123456789';
      
      return str.split('').map(char => {
        const persianIndex = persianDigits.indexOf(char);
        const arabicIndex = arabicDigits.indexOf(char);
        
        if (persianIndex !== -1) return englishDigits[persianIndex];
        if (arabicIndex !== -1) return englishDigits[arabicIndex];
        return char;
      }).join('');
    };
    
    const englishValue = persianToEnglish(inputValue);
    const value = englishValue.replace(/[^\d]/g, ""); // Remove non-digits
    
    setRawAmount(value);
    
    if (value === "") {
      setAmount("");
      return;
    }
    
    // Format with thousand separators
    const formatted = new Intl.NumberFormat("fa-IR").format(value);
    setAmount(formatted);
  }

  return (
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
      {autoWalletToggle && isConnected && (
        <input type="hidden" name="walletAddress" value={address} />
      )}
      <div className={styles["form-group"]}>
        <label htmlFor="amount">مبلغ واریزی به تومان</label>
        <div className={styles["amount-input-wrapper"]}>
          <input
            type="text"
            id="amount-display"
            className={styles["amount-input"]}
            value={amount}
            onChange={handleAmountChange}
            placeholder="مثال: ۱۰۰,۰۰۰"
            dir="rtl"
          />
          <input
            type="hidden"
            id="amount"
            name="amount"
            value={rawAmount}
          />
          <span className={styles["amount-currency"]}>تومان</span>
        </div>
      </div>
      {state?.message && (
        <div className={styles["message-box"]}>
          <p className={styles["message"]}>{state.message}</p>
        </div>
      )}
      <SubmitButton />
    </form>
  );
}
