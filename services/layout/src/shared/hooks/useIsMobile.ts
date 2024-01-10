import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [windowWidth, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      const newWindowSize = window.innerWidth;

      setWindowSize((prev) => {
        if (newWindowSize > 1024 && prev <= 1024) return newWindowSize;
        if (newWindowSize <= 1024 && prev > 1024) return newWindowSize;
        return prev;
      });
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowWidth < 1024;
};
