import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import { Toaster } from "react-hot-toast";

const DM = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "DardiBook Patient",
  description:
    "Access your medical prescriptions and health records easily through DardiBook's patient dashboard. Manage appointments, view past prescriptions, and stay updated with your healthcare in one streamlined platform.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={DM.className}
      style={{ scrollbarGutter: "auto" }}
    >
      <body className="min-h-svh" suppressHydrationWarning={true}>
        <Toaster position="top-center" />
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
