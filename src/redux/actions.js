export const STORE_WEATHER_DATA = 'STORE_WEATHER_DATA';

export const storeWeatherData = (data) => ({
  type: STORE_WEATHER_DATA,
  payload: data,
});


export const CHANGE_TEMPERATURE_UNIT = 'CHANGE_TEMPERATURE_UNIT';

export const changeTemperatureUnit = (unit) => {
  return {
    type: CHANGE_TEMPERATURE_UNIT,
    payload: unit,
  };
};


export const SELECT_DATE = 'SELECT_DATE';

export const selectDate = (date) => {
  return {
    type: SELECT_DATE,
    payload: date,
  };
};
