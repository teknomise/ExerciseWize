import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTemperatureUnit } from '../redux/actions';
import Overlay from '../assets/Overlay.png';
import LogoSmall from '../assets/logo-small.svg';
import Checked from '../assets/radio-checked.svg';
import Unchecked from '../assets/radio-unchecked.svg';
import CardSlider from './CardSlider';
import { useSelector } from 'react-redux';

const Weather = () => {
  const [checkedUnit, setCheckedUnit] = useState('C');
  const dispatch = useDispatch();
  
  const weatherData = useSelector((state) => state.weather.weatherData);


  const handleButtonClick = (unit) => {
    // console.log(unit)
    setCheckedUnit(unit);
    dispatch(changeTemperatureUnit(unit));
  };

  return (
    <div className='weather-page'>
      <div className='button-group'>
        <button type='button' className='button-weather' onClick={() => handleButtonClick('C')}>
          <img src={checkedUnit === 'C' ? Checked : Unchecked} alt='Celsius' />
          <span>Celsius</span>
        </button>

        <button type='button' className='button-weather' onClick={() => handleButtonClick('F')}>
          <img src={checkedUnit === 'F' ? Checked : Unchecked} alt='Fahrenheit' />
          <span>Fahrenheit</span>
        </button>
      </div>

      <div className='card-slider'>
        <CardSlider data={weatherData} />
      </div>

      <div className='overlay'>
        <img src={Overlay} alt='overlay' />
        <div className='logo-overlay'>
          <img className='logo' alt='logo' src={LogoSmall} />
        </div>
      </div>
    </div>
  );
};

export default Weather;

