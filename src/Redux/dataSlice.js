import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const cities = ['Chicago', 'Seattle', 'San Francisco', 'New York', 'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Shanghai', 'Beijing', 'Hong Kong', 'Shenzhen'];
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
const apiCall = async (city) => {
  const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4491fa46b9e543b1ddae58581596f81b`);
  return response.data;
};
const additionalApiCall = async (lat, lon) => {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4491fa46b9e543b1ddae58581596f81b`);
  return response.data;
};

export const fetchData = createAsyncThunk('data/fetchData', async (_, thunkApi) => {
  try {
    const results = await Promise.all(cities.map((city) => apiCall(city)));
    const d = await Promise.all(results.flat().map((a) => additionalApiCall(a.lat, a.lon)));
    const data = d.map((result, index) => ({
      ...results.flat()[index],
      airPollutionData: result,
    }));
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue({ errorMessage: 'Something went wrong' });
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.flat().map((result) => {
          let country;
          switch (result.country) {
            case 'US':
              country = 'USA';
              break;
            case 'GB':
              country = 'UK';
              break;
            case 'CA':
              country = 'CANADA';
              break;
            case 'CN':
              country = 'CHINA';
              break;
            default:
              country = result.country;
          }

          return {
            id: uuidv4(),
            name: result.name,
            country,
            state: result.state,
            components: result.airPollutionData.list[0].components,
            aqi: result.airPollutionData.list[0].main.aqi,

          };
        });
        state.data = data;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
