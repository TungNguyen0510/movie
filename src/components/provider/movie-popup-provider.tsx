"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { useMobile } from "@/hooks/use-mobile";

interface MovieInfo {
  url: string;
  title: string;
  movieSlug: string;
  serverName: string;
  episodeName: string;
}

interface MoviePopupContextType {
  isPopupVisible: boolean;
  movieInfo: MovieInfo | null;
  showPopup: (movieInfo: MovieInfo) => void;
  hidePopup: () => void;
  isOnMoviePage: boolean;
}

const MoviePopupContext = createContext<MoviePopupContextType | undefined>(
  undefined
);

export function MoviePopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();

  const isOnMoviePage = pathname.includes("/xem-phim");

  const showPopup = useCallback(
    (newMovieInfo: MovieInfo) => {
      if (isMobile) {
        return;
      }
      setMovieInfo(newMovieInfo);
      setIsPopupVisible(true);
      setHasShownPopup(true);
    },
    [isMobile]
  );

  const hidePopup = useCallback(() => {
    setIsPopupVisible(false);
    setMovieInfo(null);
    setHasShownPopup(true);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("currentMovieInfo");
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    if (isOnMoviePage && isPopupVisible) {
      setIsPopupVisible(false);
      setMovieInfo(null);
    }
  }, [isOnMoviePage, isPopupVisible]);

  useEffect(() => {
    if (!isOnMoviePage && !isMobile && typeof window !== "undefined") {
      const storedMovieInfo = sessionStorage.getItem("currentMovieInfo");
      if (storedMovieInfo && !isPopupVisible && !hasShownPopup) {
        try {
          const movieInfo = JSON.parse(storedMovieInfo);
          showPopup(movieInfo);
        } catch (error) {}
      }
    }
  }, [isOnMoviePage, isPopupVisible, hasShownPopup, isMobile, showPopup]);

  const value: MoviePopupContextType = {
    isPopupVisible,
    movieInfo,
    showPopup,
    hidePopup,
    isOnMoviePage,
  };

  return (
    <MoviePopupContext.Provider value={value}>
      {children}
    </MoviePopupContext.Provider>
  );
}

export function useMoviePopup() {
  const context = useContext(MoviePopupContext);
  if (context === undefined) {
    throw new Error("useMoviePopup must be used within a MoviePopupProvider");
  }
  return context;
}
