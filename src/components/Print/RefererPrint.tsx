/* eslint-disable @next/next/no-img-element */
import React from "react";

interface RefererInfo {
  doctorName: string;
  hospitalName: string;
  referMessage: string;
  time: any;
}

interface ReferPrintProps {
  refererInfo: RefererInfo;
}

const RefererPrint: React.FC<ReferPrintProps> = ({ refererInfo }) => {
  // const { patientInfo, hospitalInfo, refererInfo } = props;

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Medical Referral Letter</h3>
      <table className="w-full border-collapse border border-gray-400">
        <tbody>
          <tr>
            <td className="border border-gray-400 p-1 pl-2 font-medium">
              Hospital Name
            </td>
            <td className="border border-gray-400 p-1 pl-2">
              {refererInfo?.hospitalName}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-1 pl-2 font-medium">
              Doctor Name
            </td>
            <td className="border border-gray-400 p-1 pl-2">
              {refererInfo?.doctorName}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-1 pl-2 font-medium">
              Message
            </td>
            <td className="border border-gray-400 p-1 pl-2">
              {refererInfo?.referMessage}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
RefererPrint.displayName = "Refer";

export default RefererPrint;
