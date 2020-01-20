import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React from "react";

interface Props {
  property: boolean;
}

const CheckingIcon: React.FC<Props> = ({ property }) => {
  return property ? <CheckCircleOutline /> : <RadioButtonUnchecked />;
};

export default CheckingIcon;
