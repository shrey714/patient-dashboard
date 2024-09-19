import { getPatientHistory } from '@/Services/getPatientHistory';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../common/Loader';

interface PrescriptionBoxProps {
  selectedPatientId:string;
  selectedHospitalId:string;
  searchLoader:boolean;
  prescriptions:any;
}

const PrescriptionBox:React.FC<PrescriptionBoxProps> = ({selectedPatientId,selectedHospitalId,searchLoader,prescriptions})=> {
  console.log(prescriptions)
  const router = useRouter();
  return (
    <>
    {searchLoader ? (
        <Loader size={"small"} color={""} secondaryColor={""} />
      ) : (
        <>
          {prescriptions.map((prescription:any,index:number)=>{
        return (
          <div onClick={()=>{router.push(`/dashboard/prescription?doctorId=${selectedHospitalId}&patientId=${selectedPatientId}&visitId=${prescription.id}`)}}>
            {prescription.id}
          </div>
        )
      })}
        </>
      )}
      
    </>
  )
}

export default PrescriptionBox
