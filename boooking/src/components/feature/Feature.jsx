import React from 'react'
import "./feature.css"
import useFetch from '../../hooks/useFetchdata'
export const Feature = () => {
  const { data, err, load } = useFetch("http://localhost:8000/api/hotels/countcity?cities=bhubaneswar,berhampur,delhi,mumbai")
  console.log(data)
  return (
    <div>
      <div className='feature'>

      {load? ("loading data......") :( <>  <div className='featureditm'>

          <img src='https://images.unsplash.com/photo-1516259670444-ad07068e14e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' alt='ok' className='featuredimg'></img>

          <div className='feturetitles'>
            <h1>Bhubaneswar </h1>
            <h2> {data[0]}</h2>
          </div>
        </div>
          <div className='featureditm'>

            <img src='https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80' alt='ok' className='featuredimg'></img>

            <div className='feturetitles'>
              <h1>Mumbai</h1>
              <h2 >  {data[1]}</h2>
            </div>
          </div>
          <div className='featureditm'>

            <img src='https://images.freeimages.com/images/large-previews/d46/santorini-fira-2-1572367.jpg' alt='ok' className='featuredimg'></img>

            <div className='feturetitles'>
              <h1>Berhampur </h1>
              <h2> {data[3]}</h2>
            </div>
          </div>

        </>)}
      </div>


    </div>
  )
}
