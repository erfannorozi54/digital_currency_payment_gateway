import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo}>💎</span>
          <span>درگاه پرداخت ارز دیجیتال</span>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>امن و قابل اعتماد</span>
          </div>
          <div className={styles.footerDivider}></div>
          <div className={styles.footerLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span>سریع و کارآمد</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
