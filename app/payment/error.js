"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 72px)",
      direction: "rtl",
    }}>
      <div style={{
        background: "rgba(var(--card-rgb), 0.3)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(var(--card-border-rgb), 0.2)",
        borderRadius: "16px",
        padding: "2.5rem",
        textAlign: "center",
        maxWidth: "500px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
          color: "white",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
          fontWeight: 800,
          marginBottom: "1.5rem",
        }}>
          ✕
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          خطایی رخ داد
        </h2>
        <p style={{ color: "rgba(var(--foreground-rgb), 0.7)", marginBottom: "1.5rem" }}>
          {error.message || "متاسفانه مشکلی پیش آمده است"}
        </p>
        <button
          onClick={reset}
          style={{
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
