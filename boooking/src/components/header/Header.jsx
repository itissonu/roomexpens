
import { useState,useContext } from 'react';
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBed,
    faC,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import "./header.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../contex/searchContex';
import { AuthContext } from '../../contex/authContex';
export const Header = ({typeo}) => {
    const [opendate,setopenDate]=useState(false);
    const [show,showOption]=useState(false);
    const[searchtext,setsearchtext]=useState("");   //which place you want to search 
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);                                                 //for date range

    const[options,setOptions]=useState({
        adult:1,
        children:0,
        room:1

    })
    const navigate=useNavigate();
    const {dispatch}=useContext(SearchContext)
    const searchHandle =()=>{
        dispatch({type:"NEW_SEARCH",payload:{searchtext,date,options}});
navigate("/hotels",{state:{searchtext,options,date}});
    }

    const handleplace= (e)=>{
        setsearchtext(
           e.target.value
        );
    }
    const handleOption=(type,sign)=>{
        setOptions((prev)=>{
            return{
                ...prev,
                [type]:sign==='i'?prev[type]+1: prev[type]-1,
            }
        }
 //(type:sign) You cannot access an object property using dot notation when the property name is stored in a variable (type in this case). Instead, you should use square brackets to access the property dynamically.
        );
    };
  
    const {user} =useContext(AuthContext)
    return (
        <div className='header'>
            <div className='headContainer'>
                <div className='headerlist'>
                    <div className='headitem active'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Hotels</span>
                    </div>
                    <div className='headitem'>
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className='headitem'>
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rental</span>
                    </div>
                    <div className='headitem'>
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className='headitem'>
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                { typeo !== "list" &&<><h1 className='headerTitle'>Discover Comfort and Savings in Every Stay</h1>
                <p className='headerDescription'>Welcome to our luxurious hotel, where comfort meets affordability. Enjoy a lavish stay at our well-appointed rooms and indulge in top-notch amenities. And the best part? Unbelievable discounts await you, making your dream vacation a reality</p>
               {!user && <button className='headerbutton'>Sign in/Register</button>  }
                <div className='headersearch'>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faBed} />
                        <input type='text ' placeholder='where are you going' value={searchtext}  onChange={handleplace}className='Headsearchinput' />
                    </div>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span  onClick={()=>  setopenDate(!opendate)} 
                        className='Headsearchtext'>
                        {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`} 
                        </span>
                       {opendate && (<DateRange 
                            editableDateInputs={true}
                            onChange={item => 
                            setDate([item.selection]
                            )}
                            moveRangeOnFirstSelection={false}
                            ranges={date} className='calender'
                        />)}
                    </div>
                    <div className='headerSearchitem'>
                        <FontAwesomeIcon icon={faPerson} />
                        <span  onClick={()=>{ showOption(!show) }}className='Headsearchtext'>{`Adult ${options.adult} child ${options.children} room ${options.room} `}</span>
                       { show &&( <div className='options'>
                            <div className='optionsitem'>
                                <span className='optiontext'>Adult</span>
                                <div className='signcon'>
                                <button className='optcounterbutton' onClick={()=>handleOption("adult",'i')}  >+</button>
                                <span className='showOptionnumber'>{`${options.adult}`}</span>
                                <button onClick={()=>handleOption("adult",'d')} disabled={options.adult<=1}className='optcounterbutton'>-</button></div>
                            </div>
                            <div className='optionsitem'>
                                <span className='optiontext'>children</span>
                                <div className='signcon'>
                                <button onClick={()=>handleOption("children",'i')} className='optcounterbutton'>+</button>
                                <span className='showOptionnumber'>{`${options.children}`}</span>
                                <button onClick={()=>handleOption("children",'d')} disabled={options.children<=0}className='optcounterbutton'>-</button></div>
                            </div>
                            <div className='optionsitem'>
                                <span className='optiontext'>room</span>
                                <div className='signcon'>
                                <button onClick={()=>handleOption("room",'i')} className='optcounterbutton'>+</button>
                                <span className='showOptionnumber'>{`${options.room}`}</span>
                                <button onClick={()=>handleOption("room",'d')} disabled={options.room<=1} className='optcounterbutton'>-</button></div>
                            </div>
                        </div>) }
                    </div>
                    <button className='headersearchitembtn' onClick={searchHandle}>Search</button>
                </div></>}
            </div>
        </div>
    )
}
