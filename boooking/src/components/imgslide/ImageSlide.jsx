import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Create a CSS file for styling the image slider

export const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log(images)

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <img src={images[currentImageIndex]} alt="Slider" className="slider-image" />
      <button onClick={prevImage} className="slider-button prev-button">
        &lt;
      </button>
      <button onClick={nextImage} className="slider-button next-button">
        &gt;
      </button>
    </div>
  );
};
