import React,{useEffect,useState} from 'react'
import axios from "axios";

function ContactForm() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const [subject,setSubject]=useState("");
    const [message,setMessage]=useState("");
    const BASE_URL = "https://69305d77778bbf9e0071110b.mockapi.io/contact";
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newContact={
            Name:name,
            Email:email,
            Mobile:mobile,
             Find:subject,
            Message:message,
        };
        try {
            await axios.post(BASE_URL,newContact);
            alert("Contact form submitted successfully!");
            setName("");
            setEmail("");
            setMobile("");
            setSubject("");
            setMessage("");
        } catch (error) {

            console.error("Error submitting contact form:", error);
            alert("Something went wrong");
        }
    }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col py-4'>
        <h1>Contuct Us</h1>
        <label>Name
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" required/>

        </label>
        <label>Email
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" required/>
        </label>
        <label>Mobile Number
            <input type="tel" value={mobile} onChange={(e)=>setMobile(e.target.value)} name='mobile' required/>

        </label>
        <label>How did you Find Us?
        <select name="subject" onChange={(e)=>setSubject(e.target.value)} required>
            <option value="how">How did you Find Us?</option>
            <option value="google">Google</option>
            <option value="Linkdin">Linkdin</option>
            <option value="friend">Friend/Refferal</option>
            <option value="other">Other</option>
        </select> 
        </label>
        <textarea name="message" type="text" value={message} onChange={(e)=>setMessage(e.target.value)} rows="5" placeholder="Your Message" required></textarea> 
        <button type="submit">Submit</button>
      
    </form>
  )
}

export default ContactForm
