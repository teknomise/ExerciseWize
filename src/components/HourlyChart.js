import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/css'
import '../assets/css/chart.css'

const HourlyChart = memo(({ data }) => {
  const dateSelected = useSelector(state => state.date.date)
  const temperatureUnit = useSelector(state => state.temperature.unit)

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  const convertCelcius = temp => {
    const celcius = temp - 273.15
    return celcius.toFixed(0)
  }

  const convertFahrenheit = temp => {
    const fahrenheit = (temp - 273.15) * 1.8 + 32
    return fahrenheit.toFixed(0)
  }

  const getTodayDate = () => {
    const today = new Date()
    return formatDate(today)
  }

  function getHourValue(dateString) {
    const date = new Date(dateString);
    const hour = date.getHours();
    return hour.toString().padStart(2, '0');
  }
  

  const groupDataByDate = dataList => {
    const groupedData = {}

    dataList.forEach(item => {
      const date = item.dt_txt.split(' ')[0]
      const dateFormatted = formatDate(date)

      if (groupedData[dateFormatted]) {
        groupedData[dateFormatted] = [...groupedData[dateFormatted], item]
      } else {
        groupedData[dateFormatted] = [item]
      }
    })

    return groupedData
  }

  const groupedResult = groupDataByDate(data)
  const currentDate = dateSelected ? dateSelected : getTodayDate()
  const dataGrouped = groupedResult[currentDate]

  const Chart = css`
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 20px;
    width: 34px;
    width: 34px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #0A457B;
    &:hover {
      opacity: 0.8;
    }
  `

  return (
    <div className='list-temperature'>
      {dataGrouped.map((dt, index) => {
        const temp =
          temperatureUnit === 'C'
            ? convertCelcius(dt.main.temp)
            : convertFahrenheit(dt.main.temp)
            const symbol = "°";
            const jam = getHourValue(dt.dt_txt)
            // console.log(jam)
        return (
            <div className='hour-bar'  key={index}>
            <div className='bar-wrap'>
                <div
                className={css`
                    ${Chart};
                    height: ${temperatureUnit === 'C' ? temp * 3 : temp}px;
                    background-color: ${temp > 20 ? '#F6D476' : '#F6D476'};
                `}
                >
                    <span>
                        {temp}{symbol}
                    </span>
                </div>
            </div>
            <div className='hour'>
                {jam}
            </div>
            </div>
          
        )
      })}
    </div>
  )
})

export default HourlyChart
