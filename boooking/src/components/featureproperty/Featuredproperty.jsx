import React from 'react'
import './featuredproperty.css'
import useFetch from '../../hooks/useFetchdata'
export const Featuredproperty = () => {
    const { data, err, load } = useFetch("http://localhost:8000/api/hotels?featured=true&min=100&max=300")
   
    return (
        <div>
            <div className='featureprop'>
             { load ? ("data is loading please wait......"):(<>{data.map((item)=>{
                return(
             <div className='featuredpropitm' key={item._id}>

                    <img src={item.photos[0]} alt='ok' className='featuredpropimg'></img>

                  
                        <span className='fname'>{item.name}</span>
                        <span className='fcity'>{item.city}</span>
                        <span className='fprice'> Starting from ${item.chepeastprice}</span>
                        {item.rating &&<div className='frating'>
                            <button>{item.rating}</button>
                            <span>Excelent </span>
                        </div>}
                    
                </div> )})} 
               
                
                </>) }
            </div>
        </div>
    )
}
