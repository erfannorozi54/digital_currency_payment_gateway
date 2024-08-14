import styles from "./page.module.css";
import "../globals.css";
import { Button } from "@/components/Button";
import { FilterAnimation } from "@/utils/eventListener";
// import FilterAnimation from "@/utils/FilterAnimation.js";

export default function Test() {
  return (
    // <div className={styles.container}>
    //   <div className={`${styles.box} box`}></div>
    //   <Button>Press Me!</Button>
    // </div>

    <div id="mm" className={styles.container1}>
      <div className={styles.textcontent1}>Glowing Circle Effect</div>
      <FilterAnimation />
    </div>
  );
}
