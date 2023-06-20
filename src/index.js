import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import rootReducer from './redux/reducers';
import './assets/css/index.css';
import { configureStore } from '@reduxjs/toolkit';
import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: rootReducer,
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
