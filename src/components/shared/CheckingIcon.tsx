import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React from "react";

interface Props {
  property: boolean;
  guestId: string;
  fieldKey: string;
  fieldValue: boolean;
  handleClick: (guestId: string, fieldKey: string, fieldValue: boolean) => void;
}

const CheckingIcon: React.FC<Props> = ({ property }) => {
  return property ? <CheckCircleOutline /> : <RadioButtonUnchecked />;
};

export default CheckingIcon;
