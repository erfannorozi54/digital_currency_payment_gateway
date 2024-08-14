"use client";

export function Button({ children }) {
  function clickHandler(event) {
    console.log(event.target);
    document.querySelector(".box").style.setProperty("--my-color", "#0000ff");
  }
  return <button onClick={clickHandler}>{children}</button>;
}
