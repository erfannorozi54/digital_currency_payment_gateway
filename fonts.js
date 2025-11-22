import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "./public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "./public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const vazirmatn = localFont({
  src: "./public/fonts/Vazirmatn/Vazirmatn-VariableFont_wght.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
});
