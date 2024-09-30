import Loader from "@/components/common/Loader";
import { getPatientHistory } from "@/Services/getPatientHistory";
import { getPatients } from "@/Services/getPatients";
import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import toast from "react-hot-toast";
const StepOne = ({
  hospitals,
  setpatients,
  setPrescriptions,
  handleNext,
  setselectedPatientId,
  setselectedHospitalId,
  selectedHospitalId,
}: any) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [patientId, setpatientId] = useState("");

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (patientId === "") {
      const fetch = async () => {
        try {
          setSubmitLoader(true);
          const phoneId = localStorage.getItem("user");

          if (phoneId) {
            const data = await getPatients(phoneId, selectedHospitalId);

            if (data.error) {
              throw new Error(data.error);
            }

            if (data && data.data.length === 0) {
              toast.error("No user available in this hospital.");
            } else {
              setpatients(data.data);
              handleNext(2);
            }
          } else {
            toast.error("No user phone ID found. Please log in again.");
          }
        } catch (error) {
          toast.error(
            "Error in fetching patient data. Please try again later."
          );
          console.error("Error in fetching patient data:", error);
        } finally {
          setSubmitLoader(false);
        }
      };
      fetch();
    } else {
      fetchPrescriptions(patientId);
    }
  };

  const fetchPrescriptions = async (patientId: string) => {
    try {
      setSubmitLoader(true);
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
      setSubmitLoader(false);
    }
  };

  const selectedHospital = hospitals?.find(
    (item: { id: any }) => item.id === selectedHospitalId
  );

  return (
    <>
      {!hospitals ? (
        <div className="flex flex-1 w-full min-h-[30vh] items-center justify-center">
          <Loader
            size={"medium"}
            color="text-primary"
            secondaryColor="text-gray-400/50"
          />
        </div>
      ) : (
        <form
          className="flex flex-col gap-1 py-2"
          onSubmit={handleSearch}
          autoFocus={true}
          autoComplete="off"
          noValidate={false}
        >
          <div className="sm:pb-4 grid sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-3 px-1 sm:px-6">
            <label
              htmlFor="hospital_name"
              className="text-base font-medium text-gray-900 flex items-center sm:justify-center gap-1"
            >
              Select Hospital Name <p className="text-red-500">*</p>
            </label>
            <Select
              name="hospital_name"
              options={hospitals}
              labelField="clinicName"
              valueField="id"
              onChange={(values: any) =>
                setselectedHospitalId(values[0]?.id) || ""
              }
              values={selectedHospital ? [selectedHospital] : []}
              multi={false}
              clearable={true}
              // searchable={true}
              searchBy="clinicName"
              sortBy="clinicName"
              required
              className="!form-input !rounded-lg !bg-gray-200 !font-medium !w-full !lg:max-w-md !border-2"
            />
          </div>

          <div className="mt-2 sm:pb-4 grid sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-3 px-1 sm:px-6">
            <label
              htmlFor="patient_id"
              className="text-base font-medium text-gray-900 flex items-center sm:justify-center gap-1"
            >
              Enter patient id{" "}
              <p className="text-gray-400 text-xs">(optional)</p>
            </label>

            <input
              type="text"
              name="patient_id"
              id="patient_id"
              placeholder="Select..."
              value={patientId}
              onChange={(e) => {
                setpatientId(e.target.value.trim());
              }}
              className="form-input border-2 rounded-lg bg-gray-200 font-medium w-full lg:max-w-md placeholder:font-medium placeholder:text-[#9ca3af] placeholder:text-[13.35px] pl-[17px]"
            />
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-y-7">
            <button
              type="button"
              onClick={() => {
                setpatientId("");
                setselectedHospitalId("");
              }}
              className="btn animate-none border-2 btn-outline rounded-full min-h-min h-min py-2 px-7 text-xs leading-none"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={submitLoader}
              className="btn animate-none btn-wide rounded-full relative md:btn-wide btn-primary border-0 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-h-min h-min py-3"
            >
              {submitLoader ? (
                <Loader
                  size="small"
                  color="text-primary"
                  secondaryColor="text-white"
                />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default StepOne;
