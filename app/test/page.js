import styles from "./page.module.css";
import "../globals.css";
import { Button } from "@/components/Button";
import { FilterAnimation } from "@/components/FilterAnimation";

export default function Test() {
  return (
    <div className={styles.container}>
      <FilterAnimation />
      <div className="cart"></div>
    </div>
  );
}
