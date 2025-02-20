"use client";

import { ForecastResponse } from "@/interfaces/forecast-response";
import { format, fromUnixTime } from "date-fns";
import ForecastWeatherDetail from "./forcast-weather-detail";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "./weather-icon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { SingleWeatherDetail } from "./weather-details";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { MdAir } from "react-icons/md";

interface Props {
  data: ForecastResponse;
}

export default function ForecastSection({ data }: Props) {
  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <section className="p-6 space-y-4 w-full">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="w-full md:w-[40%] lg:w-[30%] 2xl:w-[20%] rounded p-6 shadow-lg text-center space-y-4">
          <h2 className="text-3xl font-bold">
            {data.city.name}, {data.city.country}
          </h2>
          <h2 className="text-6xl font-bold">
            {format(data?.list[0]?.dt_txt, "HH:mm")}
          </h2>
          <h2 className="text-2xl">
            {format(data?.list[0]?.dt_txt, "EEEE, dd MMM")}
          </h2>
        </div>

        <div className="w-full md:w-[30%] lg:w-[20%] 2xl:w-[15%] rounded p-6 shadow-lg text-center space-y-4">
          <div className="flex flex-col px-4 text-center">
            <span className="text-6xl lg:text-8xl">
              {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
            </span>
            <div className="text-xl lg:text-2xl space-x-1 whitespace-nowrap">
              <span>Feels like</span>
              <span>
                {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
              </span>
            </div>
            <div className="text-xl lg:text-2xl space-x-2">
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓
              </span>
              <span>
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%] rounded p-6 shadow-lg">
          <div className="flex items-center overflow-x-auto">
            {data?.list.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-xs font-semibold space-y-2 mb-4"
              >
                <p className="whitespace-nowrap">
                  {format(d.dt_txt, "h:mm a")}
                </p>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    d.weather[0].icon,
                    d.dt_txt.toString()
                  )}
                />
                <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="w-full lg:w-[65%] rounded p-6 shadow-lg text-center space-y-4">
          <div className="overflow-x-auto px-4 h-96">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              7 Days Forecast:
            </h2>
            {firstDataForEachDate.map((d, i) => (
              <ForecastWeatherDetail
                key={i}
                description={d?.weather[0].description ?? ""}
                weatehrIcon={d?.weather[0].icon ?? "01d"}
                date={d ? format(d.dt_txt, "EEEE, dd MMM") : ""}
                day={d ? format(d.dt_txt, "dd.MM") : "EEEE"}
                feels_like={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                temp_max={d?.main.temp_max ?? 0}
                temp_min={d?.main.temp_min ?? 0}
                airPressure={`${d?.main.pressure} hPa `}
                humidity={`${d?.main.humidity}% `}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702517657),
                  "H:mm"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  "H:mm"
                )}
                visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
                windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[30%] rounded p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex flex-col justify-center px-4 items-center shadow-md">
              <p className="capitalize text-center text-xl font-semibold">
                {firstData?.weather[0].description}{" "}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt.toString() ?? ""
                )}
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-4 shadow-md rounded">
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<LuEye />}
                    information="Visibility"
                    value={`${metersToKilometers(
                      firstData?.visibility ?? 10000
                    )}`}
                  />
                </div>
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<FiDroplet />}
                    information="Humidity"
                    value={`${firstData?.main.humidity}%`}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 shadow-md rounded">
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<MdAir />}
                    information="Wind speed"
                    value={`${convertWindSpeed(firstData?.wind.speed ?? 1.64)}`}
                  />
                </div>
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<ImMeter />}
                    information="Air Pressure"
                    value={`${firstData?.main.pressure} hPa`}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 shadow-md rounded">
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<LuSunrise />}
                    information="Sunrise"
                    value={`${format(
                      data?.city.sunrise ?? 1702949452,
                      "H:mm"
                    )}`}
                  />
                </div>
                <div className="w-full md:w-[48%] p-2">
                  <SingleWeatherDetail
                    icon={<LuSunset />}
                    information="Sunset"
                    value={`${format(data?.city.sunset ?? 1702517657, "H:mm")}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
