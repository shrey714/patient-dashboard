export const getPrescription = async (doctorId: string,patientId: string,visitId:string) => {
    try {
        const prescriptionRes = await fetch(`/api/get-prescription?doctorId=${doctorId}&patientId=${patientId}&visitId=${visitId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await prescriptionRes.json();
        return data;
    } catch (error) {
        return { error: error };
    }
};
