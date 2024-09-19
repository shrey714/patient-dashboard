import { ReactNode } from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Patient Authentication",
  description: "Authenticate Patient with phone number",
};
export default function RootLayout({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
