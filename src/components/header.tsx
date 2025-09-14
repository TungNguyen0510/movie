"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScrolledFromTop } from "@/hooks/use-scrolled-from-top";
import HeaderNavigationMenu from "./header-navigation-menu";
import HeaderNavigationDialog from "./header-navigation-dialog";

export default function Header() {
  const router = useRouter();
  const isScrolled = useScrolledFromTop();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(
        `/tim-kiem?keyword=${encodeURIComponent(searchKeyword.trim())}&page=1`
      );
    }
  };
  return (
    <header
      className={`w-full h-16 flex justify-between items-center py-4 px-4 md:px-8 top-0 left-0 fixed z-50 ${
        isScrolled ? "bg-background/50 backdrop-blur-sm" : ""
      }`}
    >
      <div className="flex items-center gap-2 xl:gap-12">
        <Label className="text-base md:text-2xl font-semibold text-nowrap">
          <Link href="/">TN Movie</Link>
        </Label>

        <HeaderNavigationMenu />
      </div>

      <div className="flex items-center gap-2">
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Tìm kiếm"
            className="w-fit max-w-48 xl:max-w-64"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </form>

        <HeaderNavigationDialog />
      </div>
    </header>
  );
}
