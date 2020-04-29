import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import React from "react";

interface Props {
  itemId: string;
  fieldKey: string;
  fieldValue: boolean;
  handleClick: (itemId: string, fieldKey: string, fieldValue: boolean) => void;
}

const CheckingIcon: React.FC<Props> = ({
  itemId,
  fieldKey,
  fieldValue,
  handleClick,
}) => {
  return (
    <div onClick={() => handleClick(itemId, fieldKey, fieldValue)}>
      {fieldValue ? (
        <CheckCircleOutline style={{ color: "#e33371" }} />
      ) : (
        <RadioButtonUnchecked />
      )}
    </div>
  );
};

export default CheckingIcon;
