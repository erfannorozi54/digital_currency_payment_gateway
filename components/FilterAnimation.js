"use client";

import { useEffect, useRef } from "react";
import styles from "./FilterAnimation.module.css";
// import Image from "next/image";
// import { img } from "@/assets/mjiran0124_A_solid_simple_and_artistic_picture_pepople_use_ethe_0ddcb052-8930-40aa-9165-8fa491b30b19.png";

export function FilterAnimation() {
  const blurRef = useRef(null);
  const getMousePos = () => {
    return new Promise((resolve) => {
      const handler = (event) => {
        removeEventListener("mousemove", handler);
        console.log(event.offsetY);
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
    };

    intervalID = setInterval(intevalFunction, 40);
  }, []);
  return (
    <>
      <div className={styles["background"]}></div>
      <div ref={blurRef} className={styles.blur}></div>
    </>
  );
}
