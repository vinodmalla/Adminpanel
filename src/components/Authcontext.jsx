import React from 'react'
import { createContext ,useState,useContext} from 'react'; 
import { setAuthToken } from '../utils/api';

const Authcontext=createContext();
export function Authprovider({children}){
    const [accessToken,setAccessToken] =useState()
    const [admin,setAdmin]=useState(null);
    
    const login=(token,data)=>{
        setAccessToken(token);
        setAdmin(data);
        
        setAuthToken(token);
    }
    const logout=()=>{
        setAdmin(null);
        setAccessToken(null)
        setAuthToken(null);
    }
    return (
        <Authcontext.Provider value={{accessToken,admin,login,logout}}>
            {children}
        </Authcontext.Provider>
    )

}
export function useAuth(){
    return useContext(Authcontext)
}
