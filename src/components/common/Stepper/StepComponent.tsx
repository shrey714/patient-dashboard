"use client";
import { useEffect, useState } from "react";
import { getAllHospitals } from "@/Services/getAllHospitals";
import StepOne from "@/components/Hospital/Sliders/StepOne";
import StepTwo from "@/components/Hospital/Sliders/StepTwo";
import StepThree from "@/components/Hospital/Sliders/StepThree";
import StepFour from "@/components/Hospital/Sliders/StepFour";
import toast from "react-hot-toast";
import { getUserID } from "@/utils";
import { getPatients } from "@/Services/getPatients";
import { getPatientHistory } from "@/Services/getPatientHistory";
export default function StepperComponent({ urlStep, hid, paid, prid }: any) {
  const [step, setStep] = useState(urlStep);

  // =========================================
  const [selectedPatientId, setselectedPatientId] = useState(paid || "");
  const [selectedHospitalId, setselectedHospitalId] = useState(hid || "");
  const [patients, setpatients] = useState<any | null>(null);
  const [hospitals, sethospitals] = useState<any | null>(null);
  const [prescriptions, setPrescriptions] = useState<any | null>(null);
  const [selectedPrescriptionId, setselectedPrescriptionId] = useState(
    prid || ""
  );

  const fetchPatients = async () => {
    try {
      // setSubmitLoader(true);
      const phoneId = await getUserID();

      if (phoneId) {
        const data = await getPatients(phoneId, selectedHospitalId);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data && data.data.length === 0) {
          toast.error("Patient ID is not found in this hospital.");
        } else {
          setpatients(data.data);
          // router.push(`/hospital/selectPatient?hid=${selectedHospitalId}`)
          console.log("2");
          // handleNext(2);
        }
      } else {
        toast.error("No user phone ID found. Please log in again.");
      }
    } catch (error) {
      toast.error("Error in fetching patient data. Please try again later.");
      console.error("Error in fetching patient data:", error);
    } finally {
      // setSubmitLoader(false);
    }
  };

  const fetchPrescriptions = async (patientId: string) => {
    try {
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
        // router.push(`/hospital/selectPrescription?hid=${selectedHospitalId}&paid=${patientId}`)

        // handleNext(3);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

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
    if (urlStep == 1 || urlStep == 4) fetchHospitals();
    if (urlStep == 2 || urlStep == 4) fetchPatients();
    if (urlStep == 3 || urlStep == 4) fetchPrescriptions(selectedPatientId);
    console.log(patients);
    let x = patients?.find(
      (pat: any) => pat.patient_unique_Id === selectedPatientId
    );
    console.log("hey = ", x);
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

  return <>{renderStepContent()}</>;
}
