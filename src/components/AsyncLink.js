'use client'
import Link from "next/link";

import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/navigation'
import { useState,useEffect } from "react";
export default function AsyncLink ({url,text}){
    const router =useRouter()
    const [loading,setLoading]=useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    useEffect(() => {
        // Attach the window.onload event handler
        window.onload = () => {
          setIsPageLoaded(true);
        };
    
        // Clean up the event handler when the component unmounts
        return () => {
          window.onload = null;
        };
      }, []);
    function handlerClick(e){
        setLoading(true)
        e.preventDefault()
     
        router.push(url)
      
    }

    if(isPageLoaded){

        return <div>page is Loading</div>
    }

    return <Link style={{textDecoration:'none',padding:3}} href="" onClick={handlerClick} >{text} {loading &&   <LinearProgress targe />} </Link>

}