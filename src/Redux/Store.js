import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const store = configureStore({
  reducer: {
    airPollutionData: dataReducer,
  },
});
export default store;
