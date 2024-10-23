"use client";
import React from "react";
import StepComponent from "@/components/common/Stepper/StepComponent";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  const hospitalId = searchParams.get("hid");
  const patientId = searchParams.get("paid");
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[calc(100%-32px)] max-w-screen-xl m-auto">
        <StepComponent urlStep={3} hid={hospitalId} paid={patientId}/>
      </div>
    </>
  );
}

export default Page;
