import React from 'react'
import './maillist.css'

export const Maillist = () => {
  return (
    <div>
        <div className='mail'>
            <h1 className='mailheading'>Feel Fee to mail us!</h1>
            <span className='maildesc'>Sign up and get  all the details and best deal</span>
            <div className='mailinput'>
                <input type='text' placeholder='enter your email'/>
                <button>Subscribe</button>
            </div>
        </div>
    </div>
  )
}
