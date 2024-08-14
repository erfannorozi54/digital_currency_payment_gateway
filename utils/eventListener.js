"use client";

import { useEffect } from "react";
import { resolve } from "styled-jsx/css";

export function FilterAnimation() {
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
          setTimeout(resolve, 300, { leftPos: -1, topPos: -1 });
        }),
      ]);

      const filterBlendElement = document.getElementById("mm", "before");
      if (leftPos == -1 && topPos == -1) {
        filterBlendElement.style.setProperty("--filter-opacity", 0);
        intervalID = setInterval(intevalFunction, 40);
      } else {
        filterBlendElement.style.setProperty("--filter-opacity", 1);
        filterBlendElement.style.setProperty("--top-pos", `${topPos}%`);
        filterBlendElement.style.setProperty("--left-pos", `${leftPos}%`);
        intervalID = setInterval(intevalFunction, 40);
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
  return;
}
