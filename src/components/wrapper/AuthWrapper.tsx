"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TopBarProgress from "react-topbar-progress-indicator";
import { getUserID } from "@/utils";

TopBarProgress.config({
  barColors: {
    "0": "#3DBDEC",
    "1.0": "#4a00ff",
  },
  shadowBlur: 10,
});

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  interface Window {
    phoneEmailListener: any;
  }
  const [loading, setloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load the external script
    const initialize = async () => {
      const user = await getUserID();
      if (!user) {
        router.replace("/signin");
        setloading(false);
      } else {
        setloading(false);
      }
    };
    initialize();
  }, [router]);

  return loading ? (
    <div className="w-screen h-svh overflow-hidden flex items-center justify-center bg-white">
      <div>{loading && <TopBarProgress />}</div>
      <Image
        src="/Logo.svg"
        height={208} // This is equivalent to h-52 in Tailwind CSS (52 * 4 = 208)
        width={208} // You might want to set a width as well for better layout control
        alt="Flowbite Logo"
        className="h-52" // Tailwind CSS class
      />
    </div>
  ) : (
    <>{children}</>
  );
};

export default AuthWrapper;
