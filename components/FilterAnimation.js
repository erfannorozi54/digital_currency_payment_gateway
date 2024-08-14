"use client";

import { useEffect, useRef } from "react";
import styles from "./FilterAnimation.module.css";

export function FilterAnimation() {
  const blurRef = useRef(null);
  const getMousePos = () => {
    return new Promise((resolve) => {
      const handler = (event) => {
        removeEventListener("mousemove", handler);
        const leftPos = (event.clientX * 100) / window.innerWidth;
        const topPos = (event.clientY * 100) / window.innerHeight;
        resolve({ leftPos, topPos });
      };
      addEventListener("mousemove", handler);
    });
  };
  useEffect(() => {
    let intervalID;
    const intevalFunction = async () => {
      clearInterval(intervalID);
      // const { leftPos, topPos } = await getMousePos();
      const { leftPos, topPos } = await Promise.race([
        getMousePos(),
        new Promise((resolve) => {
          setTimeout(resolve, 560, { leftPos: -1, topPos: -1 });
        }),
      ]);

      // const filterBlendElement = document.getElementById("mm", "before");
      if (leftPos == -1 && topPos == -1) {
        blurRef.current.style.setProperty("--transparent-radius", `${0}vh`);
        intervalID = setInterval(intevalFunction, 40);
      } else {
        blurRef.current.style.setProperty("--transparent-radius", `${12}vh`);
        blurRef.current.style.setProperty("--top-pos", `${topPos}%`);
        blurRef.current.style.setProperty("--left-pos", `${leftPos}%`);
        intervalID = setInterval(intevalFunction, 10);
      }
      console.log(`${topPos}`);
    };

    intervalID = setInterval(intevalFunction, 40);
    // document.addEventListener("mousemove", (e) => {
    //   const x = (e.clientX * 100) / window.innerWidth;
    //   const y = (e.clientY * 100) / window.innerHeight;
    //   const filterBlendElement = document.getElementById("mm", "before");

    //   filterBlendElement.style.setProperty("--top-pos", `${y}%`);
    //   filterBlendElement.style.setProperty("--left-pos", `${x}%`);
    // });
  }, []);
  //   console.log("please");
  return <div ref={blurRef} className={styles.blur}></div>;
}
