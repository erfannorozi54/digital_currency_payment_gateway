import styles from "./page.module.css";
import "../globals.css";
import { PriceHolder } from "@/components/priceHolder";
import { GatewayCreationForm } from "@/components/GatewayCreationForm";

export default function Test() {
  // async function onSubmit(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const response = await fetch("/api/submit", {
  //     method: "POST",
  //     body: formData,
  //   });
  // }
  return (
    <>
      <div dir="rtl" className={styles.container}>
        <div className={styles["cart-container"]}>
          <div className={styles["cart-header"]}>
            <h2>درگاه برای پرداخت حضوری</h2>
          </div>
          <PriceHolder />
          <GatewayCreationForm />
          <div className={styles["cart-footer"]}>
            <p>
              مشکلی پیش اومده? <a> به من بگو</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
