import { useState, useEffect } from 'react';


interface MyDimType {
  width: Number | undefined,
  height: Number | undefined,
}


export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<MyDimType>({
    width: undefined,
    height: undefined,
  });  

  useEffect( () => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions({   
          width: window?.innerWidth,
          height: window?.innerHeight,
        }); 
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
