import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./LoadingSpinner.css";

interface Props {}

const LoadingSpinner: React.FC<Props> = () => {
  return (
    <div className="Loadingspinner">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
