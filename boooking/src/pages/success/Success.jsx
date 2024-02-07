import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './success.css'; // Create a CSS file for styling
import { Navbar } from '../../components/navbar/Navbar';

export const SuccessPage = () => {
  const [displayText, setDisplayText] = useState('');
  const message = 'Room Booked Successfully';

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < (message.length)-1) {
        setDisplayText((prevText) => prevText + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (<>
  <Navbar/>
    <div className="success-container">
      <div className="success-message">
        <div className="typewriter">
          <span id="typed-text" className="message-text">
            {displayText}
          </span>
        </div>
      </div>
      <div className="success-icon">
        <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
      </div>
      <div className="go-home" onClick={() => alert('Go to Home clicked!')}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="arrow-icon" />
        <span className="go-home-text">Go to Home</span>
      </div>
    </div>
    </>
  );
};
