import styles from "./page.module.css";
import "../globals.css";
import { Button } from "@/components/Button";
import { FilterAnimation } from "@/components/FilterAnimation";

export default function Test() {
  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <div className={styles.container}>
      <FilterAnimation />
      <div className={styles["cart-container"]}>
        <div className={styles["cart-header"]}>
          <h2>درگاه برای پرداخت حضوری</h2>
        </div>
        <form>
          <div className={styles["toggle-container"]}>
            <label className={styles["toggle-label"]} htmlFor="walletToggle">
              آدرس گیرنده با اتصال به کیف پول خوانده شود
            </label>
            <label className={styles["toggle-switch"]}>
              <input type="checkbox" id="walletToggle" />
              <span className={styles["slider"]}></span>
            </label>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="walletAddress">آدرس کیف پول گیرنده</label>
            <input
              type="text"
              id="walletAddress"
              placeholder="آدرس کیف  پول گیرنده را وارد کنید"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="amount">مقدار اتریوم واریزی</label>
            <input type="number" id="walletAddress" placeholder="0.00" />
          </div>
          <button type="submit" className={styles["payment-button"]}>
            ساخت درگاه پرداخت
          </button>
        </form>
        <div className={styles["cart-footer"]}>
          <p>
            مشکلی پیش اومده? <a> به من بگو</a>
          </p>
        </div>
      </div>
      <div className={styles["cart-container"]}>
        <div className={styles["cart-header"]}>
          <h2>درگاه برای پرداخت حضوری</h2>
        </div>
        <form>
          <div className={styles["toggle-container"]}>
            <label className={styles["toggle-label"]} htmlFor="walletToggle">
              آدرس گیرنده با اتصال به کیف پول خوانده شود
            </label>
            <label className={styles["toggle-switch"]}>
              <input type="checkbox" id="walletToggle" />
              <span className={styles["slider"]}></span>
            </label>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="walletAddress">آدرس کیف پول گیرنده</label>
            <input
              type="text"
              id="walletAddress"
              placeholder="آدرس کیف  پول گیرنده را وارد کنید"
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="amount">مقدار اتریوم واریزی</label>
            <input type="number" id="walletAddress" placeholder="0.00" />
          </div>
          <button type="submit" className={styles["payment-button"]}>
            ساخت درگاه پرداخت
          </button>
        </form>
        <div className={styles["cart-footer"]}>
          <p>
            مشکلی پیش اومده? <a> به من بگو</a>
          </p>
        </div>
      </div>
    </div>
  );
}
