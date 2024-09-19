import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";

interface PatientsBoxProps {
  searchLoader: boolean;
  patients:any;
  fetchPrescriptions:any;
}

const PatientsBox: React.FC<PatientsBoxProps> = ({ searchLoader,patients,fetchPrescriptions }) => {
  return (
    <>
      {searchLoader ? (
        <Loader size={"small"} color={""} secondaryColor={""} />
      ) : (
        <>
          {patients.map((patient:any,index:number)=>{
            return (
              <div onClick={()=>{fetchPrescriptions(patient.patient_unique_Id)}}>
                {patient.first_name}
              </div>
            )
          })}
        </>
      )}
    </>
  );
};

export default PatientsBox;
