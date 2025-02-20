import React from "react";
import { Sun, Wind, Droplet, Thermometer } from "lucide-react";
import { WeatherResponse } from "@/interfaces/weather-response";

interface Props {
  data: WeatherResponse;
}

export default function WeatherSection({ data }: Props) {
  return (
    <section className="p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">
        Weather in {data.name}, {data.sys.country}
      </h2>
      <div className="flex justify-center items-center gap-2 mt-2">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          className="w-12 h-12"
        />
        <p className="text-lg capitalize">{data.weather[0].description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Thermometer />
          <p>
            {data.main.temp}°C (Feels like {data.main.feels_like}°C)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Droplet />
          <p>Humidity: {data.main.humidity}%</p>
        </div>
        <div className="flex items-center gap-2">
          <Wind />
          <p>Wind: {data.wind.speed} m/s</p>
        </div>
        <div className="flex items-center gap-2">
          <Sun />
          <p>Pressure: {data.main.pressure} hPa</p>
        </div>
      </div>
    </section>
  );
}
