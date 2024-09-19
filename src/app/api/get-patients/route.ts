import { db } from "@/firebase/firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest)=>{
    const {searchParams} = new URL(request.url)
    const phoneId = searchParams.get("phoneId");
    const doctorId = searchParams.get("doctorId");

    console.log(phoneId,doctorId)

    if (!doctorId || !phoneId) {
        return NextResponse.json(
          { error: "Doctor ID and Phone Number are required." },
          { status: 400 }
        );
      }

    const patientRef = collection(db,"doctor",doctorId,"patients");
    const snapshot = await getDocs(patientRef);
    const patients = snapshot.docs.filter((doc)=>{
        return doc.data().mobile_number===phoneId
    }).map((doc)=>{
        return {id:doc.id,...doc.data()}
    })
    console.log(patients);
    return NextResponse.json({ data: patients }, { status: 200 });

}