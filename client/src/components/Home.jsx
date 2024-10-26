import React, { useContext, useEffect } from "react";

import Header from "./Header";
import Hero from "./Hero";
import {
  pointsContext,
  PointsContextProvider,
  usePoints,
} from "@/context/PointsContext";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header  />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}

export default Home;
