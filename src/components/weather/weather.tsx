import { getForecastByCity, getWeatherByCity } from "@/app/actions";
import SearchBanner from "../searchBanner/search-banner";
import NotifyBanner from "../notifyBanner/notify-banner";
import WeatherSection from "./weather-data";
import WeatherForecast from "./forecast-data";

interface Props {
  query: string;
}

export default async function Weather({ query }: Props) {
  if (!query) {
    return (
      <SearchBanner />
    )
  }

  const weather = await getForecastByCity(query);
  //const weather = await getWeatherByCity(query);

  if (!weather) {
    return (
      <NotifyBanner message={`No results found for: ${query}`} />
    )
  }

  return (
    <>
    <div className="w-full">
      {/* <WeatherSection data={weather} /> */}
      <WeatherForecast data={weather} />
    </div>
    </>
  )
}