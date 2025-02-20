'use server';

import { WeatherResponse } from '@/interfaces/weather-response';
import { ForecastResponse } from '@/interfaces/forecast-response';

type ApiResponse<T> = T | null;

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const urlToFetch = `${url}&appid=${apiKey}`;

  try {
    const response = await fetch(urlToFetch);

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return null;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error on fetchData function:`, error);
    return null;
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherResponse | null> {
  if (!city) return null;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  return fetchData<WeatherResponse>(url);
}

export async function getForecastByCity(city: string): Promise<ForecastResponse | null> {
  if (!city) return null;

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=56`;

  return fetchData<ForecastResponse>(url);
}