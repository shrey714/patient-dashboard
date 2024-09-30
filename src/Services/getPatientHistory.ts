export const getPatientHistory = async (id: string, uid: string) => {
    try {
        const res = await fetch(`/api/get-patient-history?id=${id}&uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        return { error: error.message };
    }
};
