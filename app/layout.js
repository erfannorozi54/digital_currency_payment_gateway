import "./globals.css";
import { inter, vazirmatn } from "@/fonts.js";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/navbar";
import { FilterAnimation } from "@/components/FilterAnimation";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import { Providers } from "./provider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
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
