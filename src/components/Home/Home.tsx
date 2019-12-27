import React from "react";
import "./Home.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Younique Wedding</h1>
        <p>Plan your Wedding the right way</p>
      </div>
    </div>
  );
};

export default Home;
