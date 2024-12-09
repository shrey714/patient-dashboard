import React, { useEffect, useRef, useState } from "react";

import { useTabs } from "@/components/common/TabsLayout/hooks/use-tabs";
import { Framer } from "@/components/common/TabsLayout/lib/framer";
import PrintWrapper from "@/components/wrapper/PrintWrapper";
import PrescriptionPrint from "../../Print/PrescriptionPrint";
import RefererPrint from "../../Print/RefererPrint";
import Loader from "@/components/common/Loader";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { getPdf } from "@/Services/getPdf";

const StepFour = ({ doctorData, patientData, prescriptionData }: any) => {
  const [hookProps, sethookProps] = useState<any>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [downloadLoader, setdownloadLoader] = useState<boolean>(false)

  const convertToImgTags = (htmlContent: string) => {
    return htmlContent.replace(/<img([^>]*)>/g, (match, p1) => {
      const srcMatch = /src="([^"]+)"/.exec(p1); // Get src URL from the next/image
      if (srcMatch) {
        const imageSrc = srcMatch[1];
  
        // Extract the actual image URL from the _next/image src
        const urlMatch = /url=([^&]+)/.exec(imageSrc);
        const realImageUrl = urlMatch ? decodeURIComponent(urlMatch[1]) : '';
  
        // If we successfully extracted the real image URL, replace the image tag
        if (realImageUrl) {
          // Remove the srcset attribute from the image tag
          const imgTagWithoutSrcset = p1.replace(/srcset="[^"]*"/g, '');
          
          // Replace the image tag with the real image URL and without srcset
          return `<img src="${realImageUrl}" ${imgTagWithoutSrcset.replace(/src="([^"]+)"/, '')} />`;
        }
      }
  
      // If no src match, return the original image tag
      return match;
    });
  };
  
  const handleDownloadPDF = async(pdfName:string) => {
    // const input:any = document.getElementById('pdf');
    if (!componentRef.current) return;
    const htmlContent = componentRef.current.innerHTML;
    const htmlForPdf = convertToImgTags(htmlContent);
    const input = `
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100">
        <div class="m-4">${htmlForPdf}</div>
      </body>
    </html>
    `;
    setdownloadLoader(true)
    try {
      const url:any = await getPdf(input);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdfName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setdownloadLoader(false);
    }
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
                ref={componentRef}
                tabId="Prescription"
                downloadLoader={downloadLoader}
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
                ref={componentRef}
                tabId="Referal"
                downloadLoader={downloadLoader}
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
  }, [patientData, doctorData, prescriptionData,downloadLoader]);

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
