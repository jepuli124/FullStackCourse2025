import { useState, useEffect } from "react";

// this hook is a straight copy from https://www.dhiwise.com/post/react-get-screen-width-everything-you-need-to-know  

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

export default useWindowDimensions;