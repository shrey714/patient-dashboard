import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const fetchPatientData = async (
  id: string,
  uid: string
): Promise<any | null> => {
  try {
    const patientDocRef = doc(db, "doctor", uid, "patients", id);
    const patientDocSnap = await getDoc(patientDocRef);

    if (!patientDocSnap.exists()) {
      return null;
    }

    return patientDocSnap.data() as any;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw new Error("Failed to fetch patient data");
  }
};

const fetchPrescriptionsData = async (
  id: string,
  uid: string
): Promise<any[]> => {
  try {
    const prescriptionsQuery = query(
      collection(db, "doctor", uid, "patients", id, "visits"),
      orderBy("time", "desc") // or "desc" for descending order
    );
    const prescriptionsSnapshot = await getDocs(prescriptionsQuery);

    return prescriptionsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as any[];
  } catch (error) {
    console.error("Error fetching prescriptions data:", error);
    throw new Error("Failed to fetch prescriptions data");
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const uid = searchParams.get("uid");

  if (!id || !uid) {
    return NextResponse.json(
      { error: "Invalid patient ID or Doctor ID" },
      { status: 400, statusText: "Invalid patient ID or Doctor ID" }
    );
  }

  try {
    const patientData = await fetchPatientData(id, uid);
    if (!patientData) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404, statusText: "Patient not found" }
      );
    }

    const prescriptionsData = await fetchPrescriptionsData(id, uid);

    return NextResponse.json(
      { patient: patientData, prescriptions: prescriptionsData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
