export const getPdf = async (html:String) => {
    try {
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html }),
          });
          console.log("response : ",response)
    
          if (!response.ok) {
            throw new Error('PDF generation failed');
          }
          const pdfBlob = await response.blob();
          console.log(pdfBlob)
      const url = URL.createObjectURL(pdfBlob);
        console.log("url : ",url)
        return url;
    } catch (error) {
        return { error: error };
    }
};
