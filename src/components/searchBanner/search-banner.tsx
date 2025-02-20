import Image from "next/image";
import WeatherSVG from "@/svg/weather-icon.svg";

export default function SearchBanner() {
  return (
    <section className="flex flex-col items-center gap-4 w-full mt-10">
      <h2 className="text-2xl lg:text-3xl font-semibold">
        Search for your preffered city
      </h2>
      <Image
        src={WeatherSVG}
        alt="weather_search"
        className="w-80 lg:w-96 h-auto"
      />
    </section>
  );
}
