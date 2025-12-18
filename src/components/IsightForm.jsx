import axios from 'axios'
import React,{useState} from 'react'

function IsightForm() {
    const [formData,setFormData]=useState(
        {title:"",
            disc:"",
            img:""
        }
    )
    const BASEURL="https://694416237dd335f4c35f3edc.mockapi.io/Insightsform"
    async function handleSubmit(e){
        e.preventDefault()
        const newSubmit={
            Title:formData.title,
            Disc:formData.disc,
            img:formData.img
        }
        try{
            await axios.post(BASEURL,newSubmit);
            alert("Successfully submited the form")
            setFormData({
                title:"",
                disc:"",
                img:""
            })
        }
        catch(error){
            console.log("Something Went Wrong",error)
            alert("Something went wrong");
        }

    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Title:
            <input placeholder='enter a title' type='text' value={formData.title} onChange={(e)=>setFormData((prev)=>({...prev,title:e.target.value}))} required/>
        </label>
        <label>
            Discription:
            <textarea placeholder='enter a discription' type="text" value={formData.disc} onChange={(e)=>setFormData((prev)=>({...prev,disc:e.target.value}))} required />

        </label>
        <label>
            Image:
            <input type='file' accept='.jpg,.png,.svg' value={formData.img} onChange={(e)=>setFormData((prev)=>({...prev,img:e.target.value}))} required />
        </label>
        <button type='submit' >Submit</button>
      
    </form>
  )
}

export default IsightForm
