import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import React from "react";

const StepThree = ({
  prescriptions,
  setselectedPrescriptionId,
  selectedHospitalId,
  selectedPatientId,
}: any) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {!prescriptions ? (
        <div className="flex flex-1 w-full min-h-[30vh] items-center justify-center">
          <Loader
            size={"medium"}
            color="text-primary"
            secondaryColor="text-gray-400/50"
          />
        </div>
      ) : (
        <>
          {prescriptions?.reverse()?.map((prescription: any, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setselectedPrescriptionId(prescription.id);
                  router.push(
                    `/hospital/${selectedHospitalId}/${selectedPatientId}/${prescription.id}`
                  );

                  // handleNext(4);
                }}
                className="btn w-full animate-none flex flex-row flex-nowrap items-center justify-between"
              >
                <>
                  <h1 className="text-xs overflow-hidden sm:text-base inline text-start">
                    {prescription.diseaseDetail.length > 40
                      ? `${prescription.diseaseDetail.slice(0, 40)}...`
                      : prescription.diseaseDetail}
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      (
                      {new Date(
                        prescription.time ? prescription.time : ""
                      ).toLocaleDateString("en-GB")}
                      )
                    </p>
                  </h1>

                  <svg
                    className="size-8"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ArrowRightRoundedIcon"
                  >
                    <path d="m11.71 15.29 2.59-2.59c.39-.39.39-1.02 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71"></path>
                  </svg>
                </>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
};

export default StepThree;
