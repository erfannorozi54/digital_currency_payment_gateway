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
          <Link href="/">صفحه اصلی</Link>
        </div>
        <div className={`${styles.links} ${isOpen ? styles.mobileMenu : ""}`}>
          <ConnectButton></ConnectButton>
        </div>
        <div className={styles.menuButton}>
          <button onClick={toggleMenu} className={styles.menuIcon}>
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={styles.mobileLinks}>
          <Link href="/">
            <a className={styles.mobileLink}>Home</a>
          </Link>
          <Link href="/about">
            <a className={styles.mobileLink}>About</a>
          </Link>
          <Link href="/services">
            <a className={styles.mobileLink}>Services</a>
          </Link>
          <Link href="/contact">
            <a className={styles.mobileLink}>Contact</a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
