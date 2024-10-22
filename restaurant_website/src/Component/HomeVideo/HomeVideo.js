import React from 'react'
import './HomeVideo.css'
import { useEffect } from 'react'
import video from '../../assets/delish.mp4'
import arrow from '../../assets/arrow.png'

const HomeVideo = () => {
    useEffect(() => {
        const handleScroll = () => {
          const video = document.querySelector('.home-video video');
          const arrow=document.querySelector('.home-arrow');
          const scrollY = window.scrollY;
    
          if (scrollY > window.innerHeight * 0.8) {
            video.style.display = 'none'; // Hide video
            arrow.style.display='none';
          } else {
            video.style.display = 'block'; // Show video
            arrow.style.display='block';
          }
        };
    
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      const scrollhome=()=>{
        window.scrollTo(0,500)
      }
  return (
    <>
        <div className='home-video'>
            <video  src={video} autoPlay muted loop></video>
        </div>
        
        <img onClick={scrollhome} className='home-arrow' src={arrow}/>
        
    </>
  )
}

export default HomeVideo