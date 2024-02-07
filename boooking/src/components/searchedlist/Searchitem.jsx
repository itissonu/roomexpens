import React from 'react'
import './searchedlist.css'
import { Link } from 'react-router-dom'


export const Searchitem = ({item,searchtext}) => {
 // console.log(item.chepeastprice)
 

  return (
    <div>
        <div className='searchitmcont'>
            <img src={item.photos[0]} alt='ok' className='searchimg'/>
            
            <div className='searchdesc'>
            <h2>{item.name}</h2>
    <span className='landmark'>Landmark: Central Park {item.distance}</span>
    <span className='free-buside'>Free Buside: Available</span>
    <span className='room-details'>Room Details: 2 BHK</span>

    
  
    <span className='facilities'>{item.desc}</span>
    
    <span className='free-cancellation'>Free Cancellation </span><span className='cancel'> There is no charge ,you can cancel later</span>
            </div>
            <div className='searchdetails'>
  {item.rating  &&<div className='rating'>
    <span className='ratingheading'>Amaizing</span>
    <button>{item.rating}</button>
  </div>}
  <div className='amountd'>
    <span className='price'><span>&#8377;</span>{item.chepeastprice}</span>
    <span>Incliding all taxes</span>
    <Link  to={{
    pathname: `/hotels/${item._id}`,
    state: {
      searchtext: searchtext, // Pass the searchtext state here
    },
  }}><button>See availibility</button></Link>
    
  </div>
            </div>
        </div>
    </div>
  )
}
