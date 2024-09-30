"use client";
import React from "react";
import StepComponent from "@/components/common/Stepper/StepComponent";

function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-[calc(100%-32px)] max-w-screen-xl m-auto">
        {/* {loader ? (
          <Loader
            size={"medium"}
            color="text-primary"
            secondaryColor="text-gray-400/50"
          />
        ) : (
          <> */}
        <StepComponent />
        {/* </> */}
        {/* )} */}
      </div>
    </>
  );
}

export default Page;
