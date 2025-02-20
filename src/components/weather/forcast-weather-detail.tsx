import React from "react";
import WeatherIcon from "./weather-icon";
import WeatherDetails, { WeatherDetailProps } from "./weather-details";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <div className="w-full shadow-md rounded-xl flex flex-wrap py-4">
      <section className="flex flex-wrap gap-4 justify-center items-center px-4 w-full md:w-[30%]">
        <div className="flex flex-col gap-1 items-center w-36">
          <WeatherIcon iconName={weatehrIcon} />
          <p>{date}</p>
        </div>

        <div className="flex flex-col px-4 text-center md:text-left">
          <span className="text-4xl md:text-5xl">
            {convertKelvinToCelsius(temp ?? 0)}°
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </section>

      <section className="overflow-x-auto flex justify-between gap-4 px-4 md:px-10 w-full md:w-[70%] py-8">
        <WeatherDetails {...props} />
      </section>
    </div>
  );
}
