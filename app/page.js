import styles from "./page.module.css";
import "./globals.css";
import { GatewayCreationForm } from "@/components/GatewayCreationForm";
import { PriceHolder } from "@/components/priceHolder";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
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
            <h2 className={styles.formTitle}>ایجاد درگاه پرداخت</h2>
            <p className={styles.formDescription}>
              برای شروع تراکنش، اطلاعات زیر را وارد کنید
            </p>
            <GatewayCreationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
