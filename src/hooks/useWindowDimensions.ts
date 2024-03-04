import { useState, useEffect } from 'react';


const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height} = window;
  return {width, height}
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect( () => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions()); 
      } 

      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}
