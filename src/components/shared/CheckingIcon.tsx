import { green, red } from "@material-ui/core/colors";
import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React from "react";

interface Props {
  guestId: string;
  fieldKey: string;
  fieldValue: boolean;
  handleClick: any;
}

const CheckingIcon: React.FC<Props> = ({
  guestId,
  fieldKey,
  fieldValue,
  handleClick
}) => {
  return (
    <div onClick={() => handleClick(guestId, fieldKey, fieldValue)}>
      {fieldValue ? (
        <CheckCircleOutline style={{ color: green[500] }} />
      ) : (
        <RadioButtonUnchecked style={{ color: red[500] }} />
      )}
    </div>
  );
};

export default CheckingIcon;
