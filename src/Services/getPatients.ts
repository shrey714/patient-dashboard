export const getPatients = async (phoneId:string,doctorId:string)=>{
    try {
        console.log(doctorId)
        const data = await fetch(`/api/get-patients?phoneId=${phoneId}&doctorId=${doctorId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(data)
        const parsedData = await data.json();
        return {...parsedData,status:data?.status}
    } catch (error) {
        return {error:error}
    }
}