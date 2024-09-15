"use client";
import styles from "./SubmitButton.module.css";
import { useFormStatus } from "react-dom";
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={styles["payment-button"]}
    >
      {`${pending ? "در حال پردازش" : "ساخت درگاه پرداخت"}`}
    </button>
  );
}
