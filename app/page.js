import styles from "./page.module.css";
import "./globals.css";
import { GatewayCreationForm } from "@/components/GatewayCreationForm";
import { PriceHolder } from "@/components/priceHolder";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </span>
          <span>امن و سریع</span>
        </div>
        <h1 className={styles.title}>درگاه پرداخت ارز دیجیتال</h1>
        <p className={styles.subtitle}>
          با استفاده از درگاه پرداخت ما، به راحتی تراکنش‌های اتریوم خود را انجام دهید
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.priceSection}>
          <PriceHolder />
        </div>

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <div className={styles.formCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M12 12h.01"/>
                </svg>
              </div>
              <div>
                <h2 className={styles.formTitle}>ایجاد درگاه پرداخت</h2>
                <p className={styles.formDescription}>
                  برای شروع تراکنش، اطلاعات زیر را وارد کنید
                </p>
              </div>
            </div>
            <GatewayCreationForm />
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
          </div>
          <div>
            <h3>امنیت بالا</h3>
            <p>تراکنش‌های رمزنگاری شده و امن</p>
          </div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </span>
          </div>
          <div>
            <h3>سرعت بالا</h3>
            <p>پردازش سریع تراکنش‌ها</p>
          </div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.featureIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <path d="M12 12h.01"/>
              </svg>
            </span>
          </div>
          <div>
            <h3>پشتیبانی از کیف پول</h3>
            <p>اتصال آسان به کیف پول‌های مختلف</p>
          </div>
        </div>
      </div>
    </main>
  );
}
