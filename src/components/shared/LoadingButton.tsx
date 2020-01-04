import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

interface Props {
  isLoading: boolean;
  className?: string;
  disabled: boolean;
  [key: string]: string | number | boolean | undefined;
}

const LoadingButton: React.FC<Props> = ({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={`LoadingButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <CircularProgress size={12}  />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
