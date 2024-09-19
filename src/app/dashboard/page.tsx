"use client";
import Loader from '@/components/common/Loader';
import PatientsBox from '@/components/Dashboard/PatientsBox';
import PrescriptionBox from '@/components/Dashboard/PrescriptionBox';
import { getAllHospitals } from '@/Services/getAllHospitals';
import { getPatientHistory } from '@/Services/getPatientHistory';
import { getPatients } from '@/Services/getPatients';
import React, { useEffect, useState } from 'react'

function page() {
  const [loader, setloader] = useState(true);
  const [patientId, setpatientId] = useState("")
  const [error, seterror] = useState<string | null>(null)
  const [searchLoader, setsearchLoader] = useState(true)
  const [layer, setLayer] = useState(0)
  const [hospitals, sethospitals] = useState([])
  const [selectedHospitalId, setselectedHospitalId] = useState<string>("");
  const [patients, setpatients] = useState([]);
  const [selectedPatientId, setselectedPatientId] = useState("")
  const [prescriptions, setPrescriptions] = useState<any | null>(null);

  useEffect(() => {
    const fetchHospitals = async ()=>{
      try {
        setloader(true);
        const data = await getAllHospitals();
        console.log(data.data)
        sethospitals(data.data)
        setloader(false);
      } catch (error) {
        seterror("error in fetching hospitals")
        setloader(false);
      }
    }
    fetchHospitals();
  }, [])

  const handleSearch = ()=>{
    if(patientId==""){
      setLayer(1)
      const fetchPrescriptions = async ()=>{
        try {
            setsearchLoader(true);
            const phoneId = localStorage.getItem("user");
            if(phoneId){
                const data = await getPatients(phoneId,selectedHospitalId);
                setpatients(data.data)
                console.log(data.data)
            }
            
            setsearchLoader(false);
        } catch (error) {
            seterror("error in fetching prescriptions");
            setsearchLoader(false);
        }
    }
    fetchPrescriptions();
    }else{
      fetchPrescriptions(patientId)
    }
  }

  const fetchPrescriptions = async (patientId:string)=>{
    console.log("called for ",patientId)
    setLayer(2);
    setselectedPatientId(patientId)
    setsearchLoader(true);
    console.log(selectedHospitalId)
      const prescriptionData = await getPatientHistory(patientId, selectedHospitalId);
      if (prescriptionData) {
        console.log(prescriptionData)
        setPrescriptions(prescriptionData?.prescriptions);
        setsearchLoader(false);
      } else {
        seterror("No patient data available for the provided PatientID.");
        setsearchLoader(false);
      }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHospital:any = hospitals.find(
      (hospital:any) => hospital.clinicName === event.target.value
    );
    
    if (selectedHospital) {
      setselectedHospitalId(selectedHospital.id);
    }
  }
  
  return (
    loader ? (<Loader size={'small'} color={''} secondaryColor={''} />):(
      <>
        <div className='flex flex-col justify-center items-center h-svh w-[80vw] m-auto'>
          <div className=' bg-white w-full rounded-t-lg py-1'>
            <button onClick={()=>{setLayer((prev)=>patientId?prev-2:prev-1)}} className={`${layer==0?"hidden":"inline-block"}`}>back</button>
            Select Hospital Name : <select id="hospitalName" onChange={handleSelectChange}>
            <option value="">Select a hospital</option>
              {
                hospitals.map((item:any,index:number)=>(
                  <>
                  <option value={item.clinicName} key={index} onSelect={()=>{setselectedHospitalId(item.id)}}>{item.clinicName}</option>
                  </>
                ))
              }
            </select>
            <button onClick={handleSearch}>search</button>
          </div>
          <div className='border-t-4 border-gray-200 bg-white w-full rounded-b-lg min-h-[80svh]'>
            {
              layer==0?(<>
              Enter prescription id : <input type="text" value={patientId} onChange={(e)=>{setpatientId(e.target.value)}}/>
              <button onClick={()=>{setpatientId("")}}>Clear</button>
              </>):layer==1?(<>
                <PatientsBox searchLoader={searchLoader} patients={patients} fetchPrescriptions={fetchPrescriptions}/>
              </>):(<>
                <PrescriptionBox selectedPatientId={selectedPatientId} selectedHospitalId = {selectedHospitalId} searchLoader={searchLoader} prescriptions={prescriptions}/>
              </>)
            }
          </div>
        </div>
      </>
    )
  )
}

export default page
