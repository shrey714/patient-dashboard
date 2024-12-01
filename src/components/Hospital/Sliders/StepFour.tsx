import React, { useEffect, useState } from "react";

import { useTabs } from "@/components/common/TabsLayout/hooks/use-tabs";
import { Framer } from "@/components/common/TabsLayout/lib/framer";
import PrintWrapper from "@/components/wrapper/PrintWrapper";
import PrescriptionPrint from "../../Print/PrescriptionPrint";
import RefererPrint from "../../Print/RefererPrint";
import Loader from "@/components/common/Loader";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

const StepFour = ({ doctorData, patientData, prescriptionData }: any) => {
  const [hookProps, sethookProps] = useState<any>(null);
  const handleDownloadPDF = (pdfName:string) => {
    const input:any = document.getElementById('pdf'); 
    html2canvas(input).then((canvas) => {
      const imgData:any = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData,'png',15, 40, 180, 160);
      pdf.save(`${pdfName}.pdf`); 
    }).catch(e=>{
      throw new Error(e)
    })
  };
  useEffect(() => {
    if (patientData && doctorData && prescriptionData) {
      sethookProps({
        tabs: [
          {
            label: "Prescription Report",
            children: (
              <PrintWrapper
                doctorData={doctorData}
                patientData={patientData}
                time={prescriptionData?.time}
                handleDownloadPDF={handleDownloadPDF}
                id="pdf"
                tabId="Prescription"
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
                handleDownloadPDF={handleDownloadPDF}
                id="pdf"
                tabId="Referal"
              >
                <RefererPrint
                  refererInfo={prescriptionData?.refer}
                ></RefererPrint>
              </PrintWrapper>
            ),
            id: "Integrations",
          },
        ],
        initialTabId: "Matches",
      });
    }
  }, [patientData, doctorData, prescriptionData]);

  const framer = useTabs(hookProps || { tabs: [], initialTabId: "" });

  return (
    <div className="w-full flex flex-col">
      <>
        {hookProps ? (
          <>
            <div className="w-full items-start justify-center flex px-4 pt-0">
              <Framer.Tabs {...framer.tabProps} />
            </div>

            <div className="pt-5 sm:pb-5">{framer.selectedTab.children}</div>
          </>
        ) : (
          <div className="flex flex-1 w-full min-h-[30vh] items-center justify-center">
            <Loader
              size={"medium"}
              color="text-primary"
              secondaryColor="text-gray-400/50"
            />
          </div>
        )}
      </>
    </div>
  );
};

export default StepFour;
