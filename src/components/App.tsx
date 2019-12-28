import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import Routes from "../Routes";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import LoadingSpinner from "./shared/LoadingSpinner/LoadingSpinner";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
      setIsAuthenticating(false);
    })();
  }, []);

  return isAuthenticating ? (
    <LoadingSpinner />
  ) : (
    <div className="App">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes appProps={{ isAuthenticated, setIsAuthenticated }} />
    </div>
  );
};

export default App;
