import { useState } from "react";

export const useFormFields = (initialState: any) => {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    (event: any) => {
      setFields({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
};
