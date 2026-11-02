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
          <span className={styles["label-icon"]}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"/>
              <path d="M12 12h.01"/>
            </svg>
          </span>
          آدرس گیرنده با اتصال به کیف پول خوانده شود
        </label>
        <label className={styles["toggle-switch"]}>
          <input type="checkbox" id="walletToggle" onChange={handleToggle} />
          <span className={styles["slider"]}></span>
        </label>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="walletAddress">
          <span className={styles["label-icon"]}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          آدرس کیف پول گیرنده
        </label>
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
        <label htmlFor="amount">
          <span className={styles["label-icon"]}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
          </span>
          مبلغ واریزی به تومان
        </label>
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
