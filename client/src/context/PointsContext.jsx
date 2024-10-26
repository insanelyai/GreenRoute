import { createContext, useContext, useEffect, useState } from "react";



export const pointsContext = createContext();

export const PointsContextProvider = ({ children }) => {
  const [points, setPoints] = useState(1250);

  const [updatepoint, setUpdatepoint] = useState(0);

  useEffect(() => {
    setPoints((prev) => prev + updatepoint)
    setUpdatepoint(0) 
    
  }, [updatepoint]);

  

  return (
      <pointsContext.Provider value={{points, setPoints}}>
        {children}
      </pointsContext.Provider>
  );
};

const usePoints = () => useContext(pointsContext)
export {usePoints}
