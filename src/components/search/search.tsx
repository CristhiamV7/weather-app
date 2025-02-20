"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { useState } from "react";
import SearchIcon from "../../../public/img/search.png";
import SearchIconBlack from "../../../public/img/search-black.png";
import { useTheme } from "next-themes";

interface Props {
  placeholder?: string;
}

export default function Search({ placeholder = "Search..." }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <section className="flex items-center w-full max-w-md">
      <Input
        id="search"
        name="search"
        type="search"
        className="w-full max-w-lg rounded-l-lg"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        size="lg"
        className="py-4 rounded-r-lg border border-input"
        onClick={() => handleSearch(searchTerm)}
      >
        {theme === "dark" ? (
          <Image src={SearchIcon} alt="search" className="w-10" />
        ) : (
          <Image src={SearchIconBlack} alt="search" className="w-10" />
        )}
      </Button>
    </section>
  );
}
