
import './reservehotel.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../contex/searchContex';
export const Resevehotel = ({ setShow, hotelid }) => {
    const navigate = useNavigate();
    const [selectedRooms, setSelectedRooms] = useState([])
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true); // Initialize as true to show loading initially
    const [err, setErr] = useState(false);
    const { date } = useContext(SearchContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hotels/room/${hotelid}`);
                setData(response.data);
                setLoad(false); // Data fetched, loading is complete
            } catch (error) {
                setErr(error);
                setLoad(false); // Data fetching failed, loading is complete
            }
        }; fetchData();
    }, [hotelid]);

    console.log(err)
    console.log(data);
    console.log(load);
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date1 = new Date(start.getTime());
    
        const dates = [];
    
        while (date1 <= end) {
          dates.push(new Date(date1).getTime());
          date1.setDate(date1.getDate() + 1);
        }
    
        return dates;
      };
    const alldates = getDatesInRange(date[0].startDate, date[0].endDate);
   // console.log(alldates);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
      );
  
      return !isFound;
    }
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, {
                        dates: alldates,
                    });
                    return res.data;
                    
                })
            );
            setShow(false);
            navigate("/");
        } catch (err) { }
    }
    console.log(data.roomNumbers)
    const handleSelect = async (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );                        //if rooms selected then will be in selectedroom if not they will not(filtered out)
    }
    console.log(selectedRooms)
    console.log(data)

    return (
        <div className='reserve'>

            <div className='rContainer'>
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setShow(false)} />
                <span>select your rooms</span>
                {data.map((item) => {
                    return (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">
                                    Max people: <b>{item.maxPeople}</b>
                                </div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map((roomNumber) => (
                                    <div className="room" key={roomNumber._id}>
                                        <label>{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelect}
                                            disabled={!isAvailable(roomNumber)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })
                }
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>

        </div>
    )
}
