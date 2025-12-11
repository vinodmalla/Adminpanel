import React,{useState,useEffect} from 'react'
import  api from '../utils/api'

function TestProtected() {
     console.log("Sending request with token:", api.defaults.headers.common["Authorization"]);
    const [data,setData]=useState(null);
    useEffect(()=>{
        
        const fetchData=async()=>{
            try{
                const response=await api.get('/v1/users');
                setData(response.data);
            }catch(error){
                console.error("Error fetching protected data:",error);
            }
        }
        fetchData();
    },[])
    console.log(api.defaults.headers.common["Authorization"]);

  return (
    <div>
        <h1>Protectd Data</h1>
        {data ? <pre>{JSON.stringify(data,null,2)}</pre> : <p>...Loading</p>
        }

      
    </div>
  )
}

export default TestProtected
