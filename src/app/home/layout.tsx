import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="pt-[116px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
