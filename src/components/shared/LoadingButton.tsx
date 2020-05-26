import { Button, CircularProgress, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  spinner: {
    marginRight: "8px",
  },
}));

interface Props {
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

const LoadingButton: React.FC<Props> = ({
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      className={`LoadingButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <CircularProgress size={12} className={classes.spinner} />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
