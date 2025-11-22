"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav dir="rtl" className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>💎 درگاه پرداخت</span>
          </Link>
        </div>
        <div className={`${styles.links} ${isOpen ? styles.mobileMenu : ""}`}>
          <ConnectButton showBalance={false} />
        </div>
        <div className={styles.menuButton}>
          <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Toggle menu">
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={styles.mobileLinks}>
          <div className={styles.mobileLinkWrapper}>
            <ConnectButton showBalance={false} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
