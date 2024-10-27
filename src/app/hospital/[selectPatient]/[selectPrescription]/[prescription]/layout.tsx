import { ReactNode } from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Patient Selection",
  description: "Select Patient from selected hospital",
};
export default function RootLayout({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}
