import {useEffect, useState} from 'react'
import axios from 'axios'
const useFetch  =(url)=>{
const[data,setData]=useState({})
const[load,setLoad]=useState({})
const[err,setErr]=useState(false)
  
useEffect(()=>{
    const fetchedata= async ()=>{
        setLoad(true)   //dataloading started
        try {
            const respose= await axios.get(url)
            setData(respose.data)
        } catch (error) {
            setErr(error)
        }
       setLoad(false)    //work is done back to normal 
    };
    fetchedata();

},[url])
const refetchedata= async ()=>{
    setLoad(true)   //dataloading started
    try {
        const respose= await axios.get(url)
        setData(respose.data)
    } catch (error) {
        setErr(error)
        
    }
   setLoad(false)    //work is done back to normal 
};

return {data,err,load,refetchedata}
  
}
export default useFetch;