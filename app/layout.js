import "./globals.css";
import { inter, vazirmatn } from "@/fonts.js";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/navbar";
import { FilterAnimation } from "@/components/FilterAnimation";

export const metadata = {
  title: "درگاه پرداخت ارز دیجیتال",
  description: "درگاه پرداخت امن و سریع اتریوم - تراکنش‌های خود را با اطمینان انجام دهید",
};
import { Providers } from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" className={`${vazirmatn.variable} ${inter.variable}`}>
      <body className={vazirmatn.className}>
        <Providers>
          <FilterAnimation />

          <Navbar></Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
