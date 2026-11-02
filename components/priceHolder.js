"use client";
import { IRR2IRT } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import styles from "./priceHolder.module.css";

export function PriceHolder() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = () => {
      setLoading(true);
      fetch("/api/fetchPrice", {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          const p = data["data"];
          setPrice(p);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the price:", error);
          setPrice(286900000);
          setLoading(false);
        });
    };
    const interval = setInterval(fetchPrice, 15000);
    fetchPrice();
    
    return () => clearInterval(interval);
  }, []);
  const formattedPrice = price
    ? new Intl.NumberFormat("fa-IR", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(price)
    : null;
  return (
    <div className={styles["price-container"]}>
      <div className={styles["price-header"]}>
        <div className={styles["eth-icon"]}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 1.5l-7 11.5 7 4 7-4-7-11.5z" fill="currentColor" opacity="0.6"/>
            <path d="M5 13l7 4 7-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 22.5v-5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 13l7 9.5 7-9.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
          </svg>
        </div>
        <span className={styles["price-label"]}>قیمت اتریوم</span>
        <div className={styles["live-indicator"]}>
          <span className={styles["live-dot"]}></span>
          <span className={styles["live-text"]}>زنده</span>
        </div>
      </div>
      {loading ? (
        <div className={styles["loading-spinner"]}>
          <div className={styles["spinner"]}></div>
        </div>
      ) : (
        <div className={styles["price-display"]}>
          <span className={styles["price-value"]}>
            {formattedPrice ? formattedPrice : "N/A"}
          </span>
          <span className={styles["price-currency"]}>تومان</span>
        </div>
      )}
    </div>
  );
}
