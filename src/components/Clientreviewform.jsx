import React,{useState} from 'react'
import axios from 'axios';

function Clientreviewform() {
    const [formData,setFormData]=useState({
        name:"",
        role:"",
        company:"",
        rating:"",
        disc:""
    })
    const BASEURL="https://6935881efa8e704dafbe1e86.mockapi.io/clientrevies";
    async function handleSubmit(event) {
      event.preventDefault();
        const newForm={
            Name:formData.name,
            Role:formData.role,
            Company:formData.company,
            Rating:formData.rating,
            Disc:formData.disc,

        }
        try{
            await axios.post(BASEURL,newForm);
            alert("Successfully update");
            setFormData({
        name:"",
        role:"",
        company:"",
        rating:"",
        disc:""
    })
        }
        catch(error){
            console.log("Something Went Wrong",error)
        }
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>Name:
            <input type='text' placeholder='enter a name' value={formData.name} onChange={(e)=>setFormData((prev) => ({ ...prev, name: e.target.value }))} />

        </label>
        <label>Role:
            <input type='text' placeholder='enter a role' value={formData.role}  onChange={(e)=>setFormData((prev) => ({ ...prev, role: e.target.value }))}  />

        </label>
        <label>
            Company:
             <input type='text' placeholder='enter a company name' value={formData.company}  onChange={(e)=>setFormData((prev) => ({ ...prev, company: e.target.value }))} />
        </label>
        <label>
            Rating:
             <input type='text' placeholder='enter a rating' value={formData.rating}  onChange={(e)=>setFormData((prev) => ({ ...prev, rating: e.target.value }))} />
        </label>
        <label>
            Discription:
             <input type='text' placeholder='enter a role' value={formData.disc}  onChange={(e)=>setFormData((prev) => ({ ...prev, disc: e.target.value }))} />
        </label>
        <button type='submit'>Submit</button>
      
    </form>
  )
}

export default Clientreviewform
