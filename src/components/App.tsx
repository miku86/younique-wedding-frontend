import React, { useState } from "react";
import Routes from "../Routes";
import "./App.css";
import Navbar from "./Navbar/Navbar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Routes appProps={{isAuthenticated,setIsAuthenticated}} />
    </div>
  );
};

export default App;
