"use client";
import { ComponentProps, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllHospitals } from "@/Services/getAllHospitals";
import StepOne from "@/components/Home/Sliders/StepOne";
import StepTwo from "@/components/Home/Sliders/StepTwo";
import StepThree from "@/components/Home/Sliders/StepThree";
import StepFour from "@/components/Home/Sliders/StepFour";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function StepperComponent() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const [history, setHistory] = useState<number[]>([]); // To track step history
  const router = useRouter();
  const searchParams = useSearchParams();

  const hospitalId = searchParams.get("hospitalId");
  const patientId = searchParams.get("patientId");
  const prescriptionId = searchParams.get("prescriptionId");

  // =================== back button login ===============

  useEffect(() => {
    const handlePopState = () => {
      if (step === 1) {
        router.back();
        return;
      }

      if (history.length > 0) {
        const lastStep = history[history.length - 1];
        setHistory((prevHistory) => prevHistory.slice(0, -1));
        setDirection(-1);
        setStep(lastStep);
      } else {
        setStep(1);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [step, history]);

  // =========================================
  const [selectedPatientId, setselectedPatientId] = useState(patientId || "");
  const [selectedHospitalId, setselectedHospitalId] = useState(
    hospitalId || ""
  );
  const [patients, setpatients] = useState([]);
  const [hospitals, sethospitals] = useState<any | null>(null);
  const [prescriptions, setPrescriptions] = useState<any | null>(null);
  const [selectedPrescriptionId, setselectedPrescriptionId] = useState<
    any | null
  >(prescriptionId || null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getAllHospitals();
        if (data.error) {
          sethospitals([]);
          throw new Error(data.error);
        }
        sethospitals(data.data);
      } catch (error) {
        toast.error(
          "Error in fetching hospitals. Please check your connection and try again."
        );
        sethospitals([]);
      }
    };
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================================

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            hospitals={hospitals}
            sethospitals={sethospitals}
            handleNext={handleNext}
            setpatients={setpatients}
            setPrescriptions={setPrescriptions}
            selectedHospitalId={selectedHospitalId}
            setselectedHospitalId={setselectedHospitalId}
            setselectedPrescriptionId={setselectedPrescriptionId}
            setselectedPatientId={setselectedPatientId}
            selectedPatientId={selectedPatientId}
            selectedPrescriptionId={selectedPrescriptionId}
          />
        );
      case 2:
        return (
          <StepTwo
            handleNext={handleNext}
            setselectedPatientId={setselectedPatientId}
            selectedHospitalId={selectedHospitalId}
            setPrescriptions={setPrescriptions}
            patients={patients}
          />
        );
      case 3:
        return (
          <StepThree
            selectedPatientId={selectedPatientId}
            selectedHospitalId={selectedHospitalId}
            prescriptions={prescriptions}
            handleNext={handleNext}
            setselectedPrescriptionId={setselectedPrescriptionId}
          />
        );
      case 4:
        return (
          <StepFour
            doctorData={hospitals?.find(
              (host: any) => host.id === selectedHospitalId
            )}
            patientData={patients?.find(
              (pat: any) => pat.patient_unique_Id === selectedPatientId
            )}
            prescriptionData={prescriptions?.find(
              (pre: any) => pre.id === selectedPrescriptionId
            )}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = (nextStep: number) => {
    setHistory((prevHistory) => [...prevHistory, step]); // Add current step to history before moving forward
    setDirection(1); // set direction for next
    setStep(nextStep);
    window.history.pushState(null, "", window.location.href);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the last step from history
      setDirection(-1); // set direction for back
      setStep(lastStep);
      window.history.pushState(null, "", window.location.href);
    }
  };

  return (
    <div className="mx-auto w-full flex-1 flex-col items-center justify-center">
      <div className="flex px-8 py-3 bg-white rounded-lg shadow-sm">
        <Step step={1} currentStep={step} />
        <Step step={2} currentStep={step} />
        <Step step={3} currentStep={step} />
      </div>

      {/* className="rounded-b-lg text-white flex flex-row items-center gap-1 sm:gap-2 text-xs font-medium bg-gray-700 border-gray-800 border-4 border-t-0 w-fit py-[7px] px-2"> */}
      <div className="z-40 rounded-b-lg fixed bg-gray-800 border-4 border-t-0 border-gray-800 top-[64px] right-0 mx-4">
        <button
          onClick={handleBack}
          // disabled={step === 1 ? true : false}
          className={`${
            step === 1 ? "pointer-events-none text-gray-100/50" : "text-white"
          } breadcrumbs rounded-md flex flex-row items-center gap-1 text-xs font-medium bg-gray-700 w-fit py-[7px] px-2 active:bg-gray-800 sm:hover:bg-gray-800 duration-100`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="4 4 16 16"
            strokeWidth="1.5"
            className="size-4 currentColor"
            fill="currentColor"
            overflow="visible"
          >
            <path d="M12.29 8.71L9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7"></path>
          </svg>
          Back
        </button>
      </div>
      {/* Dynamic content based on `step` */}
      <div className="relative">
        <motion.div
          key={step} // This ensures the component re-renders on step change
          className="px-3 py-3 bg-white rounded-lg mt-2 border-gray-400/70 border-2" //min-h-[50vh]
          initial={{ x: direction === 1 ? 1000 : -1000, opacity: 0 }} // Slide in from right or left
          animate={{ x: 0, opacity: 1 }} // Slide to center
          exit={{ x: direction === 1 ? -1000 : 1000, opacity: 0 }} // Slide out to left or right
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        >
          {renderStepContent()}
        </motion.div>
      </div>

      <div className="w-full mt-5 flex items-center justify-center">
        <button
          onClick={handleBack}
          className={`${
            step === 1 ? "pointer-events-none opacity-0" : ""
          } btn animate-none btn-outline border-2 border-gray-800 text-gray-800 rounded-full min-h-min h-min py-2 px-7 text-xs leading-none`}
        >
          Back
        </button>
      </div>
    </div>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <div className="flex flex-1 flex-col items-center">
      <motion.div animate={status} className="relative">
        <motion.div
          variants={{
            active: {
              scale: 1,
              transition: {
                delay: 0,
                duration: 0.2,
              },
            },
            complete: {
              scale: 1.25,
            },
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "tween",
            ease: "circOut",
          }}
          className="absolute inset-0 rounded-full bg-blue-200"
        />

        <motion.div
          initial={false}
          variants={{
            inactive: {
              backgroundColor: "#fff", // neutral
              borderColor: "#e5e5e5", // neutral-200
              color: "#a3a3a3", // neutral-400
            },
            active: {
              backgroundColor: "#fff",
              borderColor: "#3b82f6", // blue-500
              color: "#3b82f6", // blue-500
            },
            complete: {
              backgroundColor: "#3b82f6", // blue-500
              borderColor: "#3b82f6", // blue-500
              color: "#3b82f6", // blue-500
            },
          }}
          transition={{ duration: 0.2 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
        >
          <div className="flex items-center justify-center">
            {status === "complete" ? (
              <CheckIcon className="h-6 w-6 text-white" />
            ) : (
              <span>{step}</span>
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-2 text-[10px] sm:text-sm font-semibold text-center"
        animate={status}
        initial={false}
        variants={{
          inactive: {
            color: "#a3a3a3", // neutral-400
          },
          active: {
            color: "#3b82f6", // blue-500
          },
          complete: {
            color: "#3b82f6", // blue-500
          },
        }}
        transition={{ duration: 0.2 }}
      >
        {step === 1
          ? "Select Hospital"
          : step === 2
          ? "Select Patient"
          : "Select prescription"}
      </motion.p>
    </div>
  );
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
