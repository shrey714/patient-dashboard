"use client";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("dpID");
    if (user) {
      router.replace("/home");
    }
  });

  return (
    <div className="w-screen h-svh overflow-hidden flex items-center justify-center bg-white z-50">
      <Loader
        size="large"
        color="text-primary"
        secondaryColor="text-gray-300"
      />
    </div>
  );
}
