import { combineReducers } from 'redux';
import { STORE_WEATHER_DATA, CHANGE_TEMPERATURE_UNIT, SELECT_DATE } from './actions';

const weatherInitialState = {
  weatherData: null,
};

const temperatureInitialState = {
  unit: 'C',
};

const dateInitialState = {
  date: null,
};

const weatherDataReducer = (state = weatherInitialState, action) => {
  switch (action.type) {
    case STORE_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return state;
  }
};

const temperatureReducer = (state = temperatureInitialState, action) => {
  switch (action.type) {
    case CHANGE_TEMPERATURE_UNIT:
      return {
        ...state,
        unit: action.payload,
      };
    default:
      return state;
  }
};


const dateReducer = (state = dateInitialState, action) => {
  switch (action.type) {
    case SELECT_DATE:
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather: weatherDataReducer,
  temperature: temperatureReducer,
  date: dateReducer
});

export default rootReducer;

