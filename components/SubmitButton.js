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
      {pending && (
        <span className={styles.spinner}></span>
      )}
      <span>{pending ? "در حال پردازش..." : "ساخت درگاه پرداخت"}</span>
    </button>
  );
}
