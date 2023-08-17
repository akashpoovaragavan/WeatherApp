import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'Api',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1/',
  }),
  endpoints: builder => ({
    getWeather: builder.query({
      query: params => `current.json?${new URLSearchParams(params).toString()}`,
    }),
  }),
});
export const {useGetWeatherQuery} = Api;
