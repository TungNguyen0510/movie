"use client";

import { ModeToggle } from "./theme-toggle";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LIST_CATEGORY } from "@/constants";
import { useCategory } from "@/lib/queries/useCategory";
import { useNation } from "@/lib/queries/useNation";
import { useReleaseYear } from "@/lib/queries/useReleaseYear";
import Link from "next/link";

export default function Header() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategory();

  const {
    data: nations,
    isLoading: nationsLoading,
    error: nationsError,
  } = useNation();

  const {
    data: releaseYears,
    isLoading: releaseYearsLoading,
    error: releaseYearsError,
  } = useReleaseYear();
  return (
    <header className="w-full h-16 flex justify-between items-center py-4 px-4 md:px-8 top-0 left-0 fixed z-50">
      <div className="flex items-center gap-2 md:gap-12">
        <Label className="text-2xl font-bold">
          <Link href="/">TN Movie</Link>
        </Label>

        <NavigationMenu viewport={false} className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
              <NavigationMenuContent>
                {categoriesLoading && (
                  <div className="text-sm text-muted-foreground p-2">
                    Đang tải…
                  </div>
                )}
                {categoriesError && (
                  <div className="text-sm text-red-500 p-2">
                    Không thể tải thể loại.
                  </div>
                )}
                {!categoriesLoading && !categoriesError && (
                  <ul className="grid w-[300px] gap-2 md:w-[500px] md:grid-cols-3">
                    {categories?.map((c) => (
                      <li key={c._id}>
                        <NavigationMenuLink asChild>
                          <a href="#" className="text-sm">
                            {c.name}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
              <NavigationMenuContent>
                {nationsLoading && (
                  <div className="text-sm text-muted-foreground p-2">
                    Đang tải…
                  </div>
                )}
                {nationsError && (
                  <div className="text-sm text-red-500 p-2">
                    Không thể tải quốc gia.
                  </div>
                )}
                {!nationsLoading && !nationsError && (
                  <ul className="grid w-[300px] gap-2 md:w-[500px] md:grid-cols-3">
                    {nations?.map((n) => (
                      <li key={n._id}>
                        <NavigationMenuLink asChild>
                          <a href="#" className="text-sm">
                            {n.name}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Danh sách</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 md:w-[500px] md:grid-cols-3">
                  {LIST_CATEGORY?.map((n) => (
                    <li key={n._id}>
                      <NavigationMenuLink asChild>
                        <a href="#" className="text-sm">
                          {n.name}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Năm phát hành</NavigationMenuTrigger>
              <NavigationMenuContent>
                {releaseYearsLoading && (
                  <div className="text-sm text-muted-foreground p-2">
                    Đang tải…
                  </div>
                )}
                {releaseYearsError && (
                  <div className="text-sm text-red-500 p-2">
                    Không thể tải năm phát hành.
                  </div>
                )}
                {!releaseYearsLoading && !releaseYearsError && (
                  <ul className="flex flex-col w-[128px] gap-2 overflow-y-auto max-h-96">
                    {releaseYears?.map((n) => (
                      <li key={n.year}>
                        <NavigationMenuLink asChild>
                          <a href="#" className="text-sm">
                            {n.year}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Tìm kiếm"
          className="w-64 hidden md:block"
        />
        <ModeToggle />
      </div>
    </header>
  );
}
