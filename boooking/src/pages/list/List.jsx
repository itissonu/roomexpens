import React, { useContext } from 'react'
import './list.css'
import { Navbar } from '../../components/navbar/Navbar.jsx'
import { Header } from '../../components/header/Header.jsx'
import { Footer} from '../../components/footer/Footer.jsx'
import { Maillist } from '../../components/maillist/Maillist.jsx'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {format} from "date-fns"

import { DateRange } from 'react-date-range';
import { Searchitem } from '../../components/searchedlist/Searchitem'
import useFetch from '../../hooks/useFetchdata'
import { SearchContext } from '../../contex/searchContex'
export const List = () => {
  const location=useLocation();
  const [opendate,setopenDate]=useState(false);
  const [searchtext, setSearchText] = useState(location.state.searchtext);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, err, load,refetchedata } = useFetch(`http://localhost:8000/api/hotels?city=${searchtext}&min=${min || 0 }&max=${max || 999}`)
  const {  dispatch } = useContext(SearchContext);
  const handleOperation =()=>{
    dispatch({ type: "NEW_SEARCH", payload: { date, options } });
    refetchedata()
  }

  const handleOptionChange = (optionName, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: value,
    }));
  };

  return (
    <div><Navbar/>
    <Header typeo="list"/>
    <div className='listcontainer'>
          <div className='listcompo'>
            <div className='searchlist'>
          <h1 className='h1search'>Search</h1>
            
            <div className='lsitm'>
              <label>Destination</label>
              <input placeholder={`${searchtext}`} onChange={(e)=>setSearchText(e.target.value)}type='text'/>
            </div>
            <div className='lsitm'>
              <span className='checkin'>Check-in date</span>
              <span  onClick={()=>  setopenDate(!opendate)} 
                        className='Headsearchtex'>
                        {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`} 
                        </span>
                        {opendate && (<DateRange 
                            editableDateInputs={true}
                            onChange={item => 
                            setDate([item.selection]
                            )}
                            moveRangeOnFirstSelection={false}
                            ranges={date} 
                        />)}
            </div>
            <div className="lsItem">
              <label className='opt'  >Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>{setMin(e.target.value)}}  className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={(e)=>{setMax(e.target.value)}} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input 
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) => handleOptionChange('adult', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number" 
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={(e) => handleOptionChange('children', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) => handleOptionChange('room', e.target.value)}
                  />
                </div>
              </div>
            
            </div>
            <button onClick={handleOperation}>Search</button>
            </div>
            <div className='resultbox'>
                  { load ? ("data loading....."):<> 
                    {data.map((item)=>{
                      return (
                    
                  <Searchitem item={item} searchtext={searchtext} key={item._id}/>)
                  }) }
                  </> }
            </div>
          </div>
    </div>
           <Maillist/>   
           <Footer/>                
    </div>

  )
}
