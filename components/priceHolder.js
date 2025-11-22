"use client";
import { IRR2IRT } from "@/utils/utils";
import React, { useState, useEffect } from "react";
import styles from "./priceHolder.module.css"; // Assuming you have a separate CSS file for this component
import next from "next";
import { Darumadrop_One } from "next/font/google";

export function PriceHolder() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Ethereum price
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
          // Set fallback price on error
          setPrice(286900000); // Fallback price
          setLoading(false);
        });
    };
    const interval = setInterval(fetchPrice, 15000);
    fetchPrice();
    
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  const formattedPrice = price
    ? new Intl.NumberFormat("fa-IR", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(price)
    : null;
  return (
    <div className={styles["price-container"]}>
      <span className={styles["price-label"]}>قیمت اتریوم</span>
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
