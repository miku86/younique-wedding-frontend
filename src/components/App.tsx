import * as React from "react";
import Routes from "../Routes";
import "./App.css";
import Navbar from "./Navbar/Navbar";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
