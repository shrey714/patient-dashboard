"use client";
import React from "react";
import StepComponent from "@/components/common/Stepper/StepComponent";

function Page({
  params,
}: {
  params: { selectPatient: string; selectPrescription: string };
}) {
  return (
    <StepComponent
      urlStep={3}
      hid={params.selectPatient}
      paid={params.selectPrescription}
    />
  );
}

export default Page;
