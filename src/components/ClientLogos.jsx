import React, { useState } from 'react'
import axios from 'axios';

function ClientLogos() {
    const [clientName,setclientName]=useState("");
    const [clientlogo,setClientlogo]=useState("")
    const [clientlogo64,setClientlogo64]=useState("")
    const BASE_URL="https://6935881efa8e704dafbe1e86.mockapi.io/logos";
    const handleLogoUpload = (e) => {
    const file = e.target.files     ;
    setClientlogo(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
     setClientlogo64(reader.result);
    };
  };

    async function handleSubmit(e) {
        e.preventDefault()
        const newLogo={
            ClientName:clientName,
            ClientLogo:clientlogo,
            ClientUrl:clientlogo64
        }

        try{
            await axios.post(BASE_URL,newLogo);
            alert("successfully update ")
            setClientlogo("")
            setClientlogo("")
            setClientlogo64("")
        }
        catch(error){
            console.log("Something Went Wrong",error)
        }
        
    }
  return (
    <div>
       <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" placeholder='Enter a client Name' value={clientName} onChange={(e)=>setclientName(e.target.value)} />
        <input type="file" accept='.jpg,.png,.svg'  onChange={handleLogoUpload} />
        <button type='submit'>Submit</button>
       </form>
      
    </div>
  )
}

export default ClientLogos
