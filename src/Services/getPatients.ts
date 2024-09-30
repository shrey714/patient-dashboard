import toast from 'react-hot-toast';

export const getPatients = async (phoneId: string, doctorId: string) => {
    try {
        const response = await fetch(`/api/get-patients?phoneId=${phoneId}&doctorId=${doctorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch patients');
        }

        const parsedData = await response.json();
        return { ...parsedData, status: response.status };
    } catch (error: any) {
        toast.error("Unable to fetch patient data. Please try again later.");
        console.error("Error in getPatients:", error);
        return { error: error.message };
    }
};
