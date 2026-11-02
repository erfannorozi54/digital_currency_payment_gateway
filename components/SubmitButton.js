"use client";
import styles from "./SubmitButton.module.css";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      disabled={pending}
      type="submit"
      className={`${styles["payment-button"]} ${pending ? styles.loading : ""}`}
    >
      {pending ? (
        <span className={styles.spinner}></span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M12 12h.01"/>
        </svg>
      )}
      <span>{pending ? "در حال پردازش..." : "ساخت درگاه پرداخت"}</span>
    </button>
  );
}
