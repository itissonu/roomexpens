import React from 'react';
import './banner.css'; // Create a CSS file for styling the banner

export const Banner = ({ offerText}) => {
  return (
    <div className="banner-container">
      <img src="https://images.via.com/static/dynimg/search_page/12/normal/1029094219-1029094218_hotel_bannerjpg.jpg" alt="Offer Banner" className="banner-image" />
      
    </div>
  );
};
