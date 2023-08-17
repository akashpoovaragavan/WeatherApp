import {createSlice} from '@reduxjs/toolkit';

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    todayWeather: {
      climate: '',
    },
  },
  reducers: {
    setTodayWeather(state, action) {
      state.todayWeather = action.payload;
    },
  },
});
export default WeatherSlice.reducer;

export const {setTodayWeather} = WeatherSlice.actions;
