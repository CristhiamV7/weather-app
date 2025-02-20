import { ToggleTheme } from "../toggleTheme/toggle-theme";
import Link from "next/link";
import { TiWeatherPartlySunny } from "react-icons/ti";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-lg">
      <Link href="/" className="flex items-center gap-4">
        <TiWeatherPartlySunny className="text-3xl text-white-400" />
        <h1 className="text-2xl font-semibold">Weather Application</h1>
      </Link>
      <div className="flex space-x-2">
        <ToggleTheme />
      </div>
    </header>
  );
}
