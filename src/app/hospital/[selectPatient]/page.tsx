"use client";
import React from "react";
import StepComponent from "@/components/common/Stepper/StepComponent";

function Page({ params }: { params: { selectPatient: string } }) {
  return <StepComponent urlStep={2} hid={params.selectPatient} />;
}

export default Page;
