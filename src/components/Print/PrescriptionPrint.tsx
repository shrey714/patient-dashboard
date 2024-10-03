/* eslint-disable @next/next/no-img-element */
import React from "react";

interface Dosage {
  morning?: string | "";
  afternoon?: string | "";
  evening?: string | "";
  night?: string | "";
}

interface Medicine {
  medicineName: string;
  instruction: string;
  dosages: Dosage;
  duration: string;
  durationType: string;
  type: string;
}

interface PrescriptionInfo {
  diseaseDetail: string;
  medicines: Medicine[];
  advice: string;
  nextVisit: string;
  time: any;
}

interface PrescriptionPrintProps {
  prescriptionInfo: PrescriptionInfo;
}

const countableTypes = ["TAB", "CAP", "DROP", "INJECTION", "SUPPOSITORY"]; // Add more types as needed

function calculateTotalMedicinesRequired(medicine: Medicine): any {
  let totalMedicines = 0;

  if (countableTypes.includes(medicine?.type)) {
    const {
      morning = "",
      afternoon = "",
      evening = "",
      night = "",
    } = medicine?.dosages;

    const totalDosage =
      (parseInt(morning) || 0) +
      (parseInt(afternoon) || 0) +
      (parseInt(evening) || 0) +
      (parseInt(night) || 0);

    let durationDays = parseInt(medicine?.duration) || 1;
    switch (medicine.durationType) {
      case "month":
        durationDays *= 30; // Assuming an average of 30 days in a month
        break;
      case "year":
        durationDays *= 365; // Assuming 365 days in a year
        break;
      // No need to adjust for "day" since it's already in days
      default:
        break;
    }
    totalMedicines += totalDosage * durationDays;
  } else {
    return "";
  }

  return totalMedicines;
}

const PrescriptionPrint: React.FC<PrescriptionPrintProps> = ({
  prescriptionInfo,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Prescription Information</h3>
      <p className="mb-4">
        <span className="font-medium">Disease Detail:</span>{" "}
        {prescriptionInfo?.diseaseDetail}
      </p>

      <div className="col-span-full pb-4">
        <label className="block text-lg mb-2 font-semibold leading-7">
          Medicines
        </label>

        <div className="text-center">
          <table className="table w-full border border-gray-400 ">
            <thead>
              <tr>
                <th className="font-medium text-base text-gray-800 border border-gray-400 py-[6px]">
                  Medicine Name
                </th>
                <th className="font-medium text-base text-gray-800 border border-gray-400 py-[6px]">
                  Instruction
                </th>
                <th className="font-medium text-base text-gray-800 border border-gray-400 py-[6px]">
                  Dosages
                </th>
                <th className="font-medium text-base text-gray-800 border border-gray-400 py-[6px]">
                  Duration
                </th>
                <th className="font-medium text-base text-gray-800 border border-gray-400 py-[6px]">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {prescriptionInfo?.medicines?.map((row: any, index: any) => (
                <tr key={index}>
                  <td className="align-top py-[2px] border border-gray-400">
                    <div className="w-full border-0 text-gray-900 bg-transparent">
                      {row?.medicineName}
                    </div>
                  </td>
                  <td className="align-top py-[2px] border border-gray-400">
                    <div className="w-full border-0 text-gray-900 bg-transparent">
                      {row?.instruction}
                    </div>
                  </td>
                  <td className="align-top py-[2px] border border-gray-400 w-1/3">
                    <div key={index} className={"flex flex-col items-center"}>
                      {["morning", "afternoon", "evening", "night"].map(
                        (status) => {
                          const value = row?.dosages[status];
                          if (value && value !== "0" && value.trim() !== "") {
                            return (
                              <div
                                key={status}
                                className="w-full border-0 py-[1px] text-gray-900 bg-transparent"
                              >
                                {`${
                                  status.charAt(0).toUpperCase() +
                                  status.slice(1)
                                }: ${value} ${row?.type || ""}`}
                              </div>
                            );
                          }
                          return null;
                        }
                      )}
                    </div>
                  </td>
                  <td className="align-top py-[2px] border border-gray-400">
                    <div className="w-full border-0 text-gray-900 bg-transparent">
                      {row?.duration || ""}{" "}
                      {row.durationType
                        ? `${row.durationType}${row.duration > 1 ? "s" : ""}`
                        : ""}
                    </div>
                  </td>
                  <td className="align-top py-[2px] border border-gray-400">
                    <div className="w-full border-0 text-gray-900 bg-transparent">
                      {calculateTotalMedicinesRequired(row)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mb-2">
        <span className="font-medium">Advice:</span> {prescriptionInfo?.advice}
      </p>
      <p>
        <span className="font-medium">Next Visit:</span>{" "}
        {prescriptionInfo?.nextVisit
          ? new Date(prescriptionInfo?.nextVisit).toLocaleDateString()
          : ""}
      </p>
    </div>
  );
};
PrescriptionPrint.displayName = "Prescription";

export default PrescriptionPrint;
