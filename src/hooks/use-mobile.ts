"use client";

import { useState, useEffect } from "react";

/**
 * Detects mobile devices based on:
 * - Screen width (<= 768px)
 * - User agent string (mobile device patterns)
 * 
 * @returns {boolean}
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      
      const isSmallScreen = width <= 768;
      
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      const isMobileDevice = isSmallScreen || isMobileUserAgent;
      
      setIsMobile(isMobileDevice);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
