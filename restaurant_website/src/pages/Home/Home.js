import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import video from '../../assets/delish.mp4'
import arrow from '../../assets/arrow.png'

const Home = ({ menu, setmenu }) => {
  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.querySelector('.bgvideo video');
      const arrowElement = document.querySelector('.downArrow');
      const scrollY = window.scrollY;

      if (scrollY > window.innerHeight * 0.9) {
        videoElement.style.display = 'none';
        arrowElement.style.display = 'none';
      } else {
        videoElement.style.display = 'block';
        arrowElement.style.display = 'block';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: 580, behavior: 'smooth' });
  };

  return (
    <div className='homevideo'>
      <div className='bgvideo'>
        <video src={video} autoPlay loop muted />
      </div>

      <div className='div_arrow'>
        <img
          onClick={scrollToContent}
          src={arrow}
          alt='Scroll Down'
          className='downArrow'
        />
      </div>

      <div className='header'>
        <div className='header-content'>
          <h2>Order your favourite food here..</h2>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients.
          </p>
          
            <Link onClick={() => setmenu('Menu')} to='/Menu'>
            <span>View Menu</span>
            </Link>
            
        </div>
      </div>
    </div>
  );
};

export default Home;