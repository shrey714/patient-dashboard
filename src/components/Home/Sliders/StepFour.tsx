import React, { useState } from "react";

import { useTabs } from "@/components/common/TabsLayout/hooks/use-tabs";
import { Framer } from "@/components/common/TabsLayout/lib/framer";
import PrintWrapper from "@/components/wrapper/PrintWrapper";
import PrescriptionPrint from "../../Print/PrescriptionPrint";
import RefererPrint from "../../Print/RefererPrint";

const StepFour = ({ doctorData, patientData, prescriptionData }: any) => {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Prescription Report",
        children: (
          <PrintWrapper
            doctorData={doctorData}
            patientData={patientData}
            time={prescriptionData?.time}
          >
            <PrescriptionPrint prescriptionInfo={prescriptionData} />
          </PrintWrapper>
        ),
        id: "Prescription",
      },
      {
        label: "Referral Letter",
        children: (
          <PrintWrapper
            doctorData={doctorData}
            patientData={patientData}
            time={prescriptionData?.time}
          >
            <RefererPrint refererInfo={prescriptionData?.refer}></RefererPrint>
          </PrintWrapper>
        ),
        id: "Integrations",
      },
    ],
    initialTabId: "Matches",
  });
  const framer = useTabs(hookProps);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full items-start justify-center flex px-4 pt-0">
        <Framer.Tabs {...framer.tabProps} />
      </div>

      <div className="pt-5 sm:pb-5">{framer.selectedTab.children}</div>
    </div>
  );
};

export default StepFour;
