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
    // Simulate a network request to fetch the Ethereum price
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
          setLoading(false);
        });
    };
    setInterval(fetchPrice, 15000);
    fetchPrice();
  }, []);
  const formattedPrice = price
    ? new Intl.NumberFormat("fa-IR", {
        style: "currency",
        currency: "IRR",
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
        <div>
          <span className={styles["price-value"]}>
            {formattedPrice ? IRR2IRT(formattedPrice) : "N/A"}Ξ
          </span>
        </div>
      )}
    </div>
  );
}
