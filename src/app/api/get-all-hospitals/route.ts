import { db } from "@/firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    const doctorRef = collection(db,"doctor")
    const snapshot = await getDocs(doctorRef)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ data: data }, { status: 200 });
}