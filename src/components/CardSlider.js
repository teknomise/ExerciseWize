import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import "../assets/css/sliders.css";
import { useDispatch } from 'react-redux';
import { selectDate } from "../redux/actions";
import HourlyChart from "./HourlyChart";

import WeatherRain from "../assets/Weather-Rain-True.svg";
import WeatherFair from "../assets/Weather-Fair-True.svg";
import WeatherClear from "../assets/Weather-Clear-True.svg";
import WeatherShowers from "../assets/Weather-Showers-True.svg";
import WeatherThunder from "../assets/Weather-Thunder-True.svg";
const MemoizedHourlyChart = React.memo(HourlyChart);

const CardSlider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const temperatureUnit = useSelector((state) => state.temperature.unit);

  const convertCelcius = (temp) => {
    const celcius = temp - 273.15;
    return celcius.toFixed(0);
  };

  const convertFahrenheit = (temp) => {
    const fahrenheit = (temp - 273.15) * 1.8 + 32;
    return fahrenheit.toFixed(0);
  };

  const setSelectedWeather = (date) => {
    dispatch(selectDate(date))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };


  const groupWeatherByDate = (weatherData) => {
    const groupedWeather = weatherData.reduce((acc, weather) => {
      const date = formatDate(weather.dt_txt);
      if (!acc[date]) {
        acc[date] = {
          weatherList: [],
          totalTemp: 0,
        };
      }
      acc[date].weatherList.push(weather);
      acc[date].totalTemp += weather.main.temp;
      return acc;
    }, {});

    

    return Object.entries(groupedWeather).map(([date, info]) => {
      const avgTemp = info.totalTemp / info.weatherList.length;
      const weatherType = info.weatherList[0].weather[0].main
      return {
        date,
        avgTemp,
        weatherType
      };
    });
  };

  const getWeatherIconClass = (weatherType) => {
    switch (weatherType) {
      case 'Rain':
        return WeatherRain;
      case 'Fair':
        return WeatherFair;
     case 'Cloouds':
      return WeatherClear;
     case 'Thunder':
      return WeatherThunder;
      default:
        return WeatherShowers;
    }
  };

  const renderWeatherCards = (weatherData) => {
    const dailyWeatherData = groupWeatherByDate(weatherData);
    return dailyWeatherData.map((weather, index) => {
      const temperature = temperatureUnit === "F" ? convertFahrenheit(weather.avgTemp) : convertCelcius(weather.avgTemp);
      const symbol = temperatureUnit === "F" ? "°F" : "°C";
      const isActive = currentSlide === index;
      const cardClassName = isActive ? "weather-card-active" : "weather-card";
      const weatherIconClass = getWeatherIconClass(weather.weatherType);
      
      return (
        <div key={weather.date} onClick={() => setSelectedWeather(weather.date)}>
          {isActive ? <img src={weatherIconClass} alt="Weather Icon" /> : <></>}
          <div className={cardClassName}>
            {isActive ? <h3 className="temp-font">{temperature}{symbol}</h3> : <></>}
            <p className="temp-date">{weather.date}</p>
          </div>
        </div>
      );
    });
  };


  const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 1000,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      setSelectedWeather(groupWeatherByDate(data.list)[next].date);
    },
  };



  return (
    <div className="card-slider">
      <Slider {...sliderSettings}>{renderWeatherCards(data.list)}</Slider>
      <MemoizedHourlyChart data={data.list}/>
    </div>
  );
};

export default CardSlider;

