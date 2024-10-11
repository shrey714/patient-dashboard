import { db } from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest)=>{
    const {searchParams} = new URL(request.url)
    const patientId = searchParams.get("patientId");
    const visitId = searchParams.get("visitId");
    const doctorId = searchParams.get("doctorId");

    if (!doctorId || !visitId || !patientId) {
        return NextResponse.json(
          { error: "Doctor ID, Visit Id and PatientId are required." },
          { status: 400 }
        );
      }

    const prescriptionRef = doc(db,"doctor",doctorId,"patients",patientId,"visits",visitId);
    const snapshot = await getDoc(prescriptionRef);
    if (!snapshot.exists()) {
        return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
      }
      const prescriptionData = snapshot.data();
    return NextResponse.json({ data: prescriptionData }, { status: 200 });

}