import { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import './hotel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowCircleLeft, faCancel, faCross, faLocation, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { Maillist } from '../../components/maillist/Maillist'
import { Footer } from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetchdata'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../../contex/searchContex'
import { AuthContext } from '../../contex/authContex'
import { Resevehotel } from '../../components/reserve/Resevehotel'

export const Hotel = () => {
  const location = useLocation()
  const navigate=useNavigate()
 // console.log(location)
  const hotelid = location.pathname.split('/')[2];    //to find out the location or id of the hotel
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);   //intially 1st element is passed
  const[modalcheck,setModalcheck]=useState(false)
  const { data, err, load } = useFetch(`http://localhost:8000/api/hotels/find/${hotelid}`)
           
  const {user} =useContext(AuthContext)
  const handleshow = (i) => {
    setShow(!show);
    setIndex(i);
  }
  const handledir = (direction) => {
    let newindex;
    if (direction === 'left') {
      newindex = index === 0 ? data.photos.length - 1 : index - 1;
    } else if (direction === 'right') {
      newindex = index === data.photos.length - 1 ? 0 : index + 1;
    }
    setIndex(newindex);
    console.log(newindex)
  }

  const Milisec = 1000 * 60 * 60 * 24;   //in a day
  function dayDifference(date1, date2) {
   
    const totaltime = Math.abs(date2.getTime() - date1.getTime());      
    const totaldays = Math.ceil(totaltime / Milisec);
    return totaldays;
  }
  const { date, options } = useContext(SearchContext);
 /* const savedState = JSON.parse(localStorage.getItem('searchContext'));
  const {  date,  options } = savedState || {};
  console.log(savedState) */
 
  const days = dayDifference(date[0].endDate, date[0].startDate);
  //change


const handlebtn =()=>{
  if(user){
    setModalcheck(true);
 
  }else{
    
    navigate('/login')
  }
}
   //console.log(modalcheck)
  
 // console.log(hotelid)
  return (

    <div><Navbar />
      <Header typeo="list" />
      <div className='hotelshowcontainer'>{load ? ("loading please wait.........") : <>
        {show && <div className='imagesliderwrap'>
          <FontAwesomeIcon className='faright' onClick={() => handledir('left')} icon={faArrowCircleLeft} />
          <div className='sliderimgcont'>
            <img className='sliderimg' src={data.photos[index]} ></img>
          </div>

          <FontAwesomeIcon onClick={() => handledir('right')} className='faleft' icon={faArrowAltCircleRight} />
          <FontAwesomeIcon className='into' onClick={() => setShow(false)} icon={faXmarkCircle} />

        </div>}
        <div className='hotelplace'>
          <h1 className='hotelname'>{data.name}</h1>

          <span className='addres'><FontAwesomeIcon icon={faLocation} />{data.address}</span>
          <span className='ratetheplace'> Excelent Location - {data.distance}Near The Airport</span>
          <span className='book'>Book Now at ${data.chepeastprice} and get a free coupon code for OLA riding</span>
          <button className='registernow'>Reserve or Book</button>
        </div>
        <div className='imgcontainer'>
          {data.photos.map((image, i) => {      //2nd params goes for the index of the element in the array
            return (
              <div className='image' key={i} >
                <img onClick={() => handleshow(i)} src={image} />
              </div>
            );
          })}
        </div>
        <div className='moredetais'>
          <div className='desc'>
            <h1>{data.title}</h1>
            <p>

              {data.desc}
            </p>
          </div>
          <div className='price0'>
            <h4>Perfect for {days}-nights stay 😊</h4>
            <p>Nestled in the heart of a bustling metropolis, Paradise Luxury Hotel offers you an enchanting retreat that combines modern comfort with timeless elegance.
            </p>
            <span>🎉 ${days * data.chepeastprice * options.room}({days} nights)</span>
            <button onClick={handlebtn}>Reserve or Book!</button>
          </div>
        </div> </>}

      </div>

      <Maillist />
      <Footer />
    {modalcheck && <Resevehotel setShow={setModalcheck} hotelid={hotelid} />}
    </div>
  )
}
