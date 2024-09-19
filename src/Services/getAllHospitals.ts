export const getAllHospitals = async()=>{
    try {
        const data = await fetch("/api/get-all-hospitals",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const parsedData = await data.json();
        return {...parsedData,status:data?.status}
    } catch (error) {
        return {error:error}
    }
}