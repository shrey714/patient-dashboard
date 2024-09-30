import { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Patient Authentication",
  description: "Authenticate Patient with phone number",
};
export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="pt-[116px]">
      <Navbar />
      <div className="z-30 fixed breadcrumbs flex flex-row items-center gap-1 sm:gap-2 text-xs font-medium top-[72px] shadow-sm max-w-[calc(100%-32px)] mx-4 bg-white w-fit py-[7px] px-2 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          className="h-4 w-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>{" "}
        9999999999
      </div>
      {children}
      <Footer />
    </div>
  );
}
