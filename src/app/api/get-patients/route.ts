import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const phoneId = searchParams.get("phoneId");
    const doctorId = searchParams.get("doctorId");

    if (!doctorId || !phoneId) {
      return NextResponse.json(
        { error: "Doctor ID and Phone Number are required." },
        { status: 400 }
      );
    }

    const patientRef = collection(db, "doctor", doctorId, "patients");
    const snapshot = await getDocs(patientRef);
    const patients = snapshot.docs
      .filter((doc) => doc.data().mobile_number === phoneId)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ data: patients }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients." },
      { status: 500 }
    );
  }
};
