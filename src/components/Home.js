import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeWeatherData } from '../redux/actions';
import Logo from '../assets/logo.svg';
import Ilustration from '../assets/illustration.svg';
import Lottie from 'react-lottie';
import animationData from '../assets/animation.json';
import Weather from './Weather';

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch API data here
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&APPID=9e50961d2d2310ba5be56305352604d7&cnt=40'
    )
      .then(response => response.json())
      .then(jsonData => {
        dispatch(storeWeatherData(jsonData));

        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      })
      .catch(error => console.error(error))
  }, [dispatch])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      {isLoading && (
        <>
          <div className='loading-animation'>
            <Lottie options={defaultOptions} height={400} width={'100%'} />
          </div>

          <div className='information-container'>
            <div className='your-weather-will'>
              Your weather will be served in no time
            </div>
          </div>
          <div className='brand-container'>
            <img className='illustration-icon' alt='Wize' src={Ilustration} />
            <div className='logo-container'>
              <img className='logo-icon' alt='logo' src={Logo} />
              <div className='brand-statement'>We’ve got you weathered.</div>
            </div>
          </div>
        </>
      )}
      {!isLoading && <Weather />}
    </>
  )
}

export default LoadingPage
