import toast from 'react-hot-toast';

export const getAllHospitals = async () => {
    try {
        const data = await fetch("/api/get-all-hospitals", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!data.ok) {
            const errorData = await data.json();
            throw new Error(errorData.error || 'Failed to fetch hospitals');
        }

        const parsedData = await data.json();
        return { ...parsedData, status: data?.status };
    } catch (error: any) {
        toast.error("Unable to fetch hospitals data. Please try again later.");
        console.error("Error in getAllHospitals:", error);
        return { error: error.message };
    }
}
