import Loader from "@/components/common/Loader";
import { getPatientHistory } from "@/Services/getPatientHistory";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StepTwo = ({
  handleNext,
  setselectedPatientId,
  selectedHospitalId,
  setPrescriptions,
  patients,
}: any) => {
  const [loadingPatient, setLoadingPatient] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchPrescriptions = async (patientId: string) => {
    try {
      setLoadingPatient((prev) => ({ ...prev, [patientId]: true }));
      setselectedPatientId(patientId);

      const prescriptionData = await getPatientHistory(
        patientId,
        selectedHospitalId
      );

      if (prescriptionData.error) {
        throw new Error(prescriptionData.error);
      }
      if (prescriptionData?.patient?.length === 0) {
        toast.error("No patient available in this hospital.");
      } else if (prescriptionData?.prescriptions?.length === 0) {
        toast.error("No prescriptions available for this patient.");
      } else {
        setPrescriptions(prescriptionData?.prescriptions);
        handleNext(3);
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoadingPatient((prev) => ({ ...prev, [patientId]: false }));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {patients.map((patient: any, index: number) => {
        const isLoading = loadingPatient[patient.patient_unique_Id];
        return (
          <button
            key={index}
            onClick={() => fetchPrescriptions(patient.patient_unique_Id)}
            className="btn animate-none flex flex-row items-center justify-between"
          >
            <>
              <h1 className="text-sm sm:text-base flex flex-row gap-1 items-center">
                {patient.first_name} {patient.last_name}
                <p className="text-xs text-gray-500">
                  ({patient.patient_unique_Id})
                </p>
              </h1>
              {isLoading ? (
                <Loader
                  size={"small"}
                  color="text-primary"
                  secondaryColor="text-gray-400/50"
                />
              ) : (
                <svg
                  className="size-8"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ArrowRightRoundedIcon"
                >
                  <path d="m11.71 15.29 2.59-2.59c.39-.39.39-1.02 0-1.41L11.71 8.7c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71"></path>
                </svg>
              )}
            </>
          </button>
        );
      })}
    </div>
  );
};

export default StepTwo;
