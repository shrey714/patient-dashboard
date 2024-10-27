"use client";
import React from "react";
import StepComponent from "@/components/common/Stepper/StepComponent";

function Page({
  params,
}: {
  params: {
    selectPatient: string;
    selectPrescription: string;
    prescription: string;
  };
}) {
  return (
    <StepComponent
      urlStep={4}
      hid={params.selectPatient}
      paid={params.selectPrescription}
      prid={params.prescription}
    />
  );
}

export default Page;
