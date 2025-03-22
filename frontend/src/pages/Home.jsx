import React from "react";
import Header from "../components/Header";
import Safaris from "../components/Safaris";
import Quick from "../components/Quick";
import Nearby from "../components/Nearby";
import SandSea from "../components/SandSea";
import Cultures from "../components/Cultures";
import Hiking from "../components/Hiking";

const Home = () => {
  return (
    <div>
      <Header />
      <Quick />
      <Nearby />
      <Hiking />
      <Safaris />
      <SandSea />
      <Cultures />
    </div>
  );
};

export default Home;
