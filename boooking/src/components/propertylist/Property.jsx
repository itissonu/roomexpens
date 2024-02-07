import React, { useContext } from 'react'
import './property.css'
import useFetch from '../../hooks/useFetchdata';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contex/searchContex';
export const Property = () => {
    const { data, err, load } = useFetch("http://localhost:8000/api/hotels/typecount")
   
    const imagesArray = [
        { src: 'https://images.freeimages.com/images/large-previews/b6b/hotel-room-1217627.jpg' },
        { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80' },
        { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'  },
        { src: 'https://plus.unsplash.com/premium_photo-1681922761181-ee59fa91edc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
        { src: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' },
      ];
      const navigate=useNavigate();
    //  const {dispatch}=useContext(SearchContext)
      const searchHandle =(searchtext)=>{
        //  dispatch({type:"NEW_SEARCH",payload:{searchtext:"hotel"}});
  navigate("/type",{state:{searchtext:searchtext}});
  //navigate("/type")
      }
      
  return (
    <div>
        <div className='plcontainer'>
          {data && imagesArray.map((img,i)=>{
            return(
          <div className='pllistcard' key={i}>
                <img src={img.src} className='pllistimg' onClick={() => searchHandle(data[i]?.type)}></img>
                <div className='pltitle'>
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count}  {data[i]?.type} </h2>
                </div>
            </div>)
             })}
             </div>
            
           
            
        
    </div>
  )
}
