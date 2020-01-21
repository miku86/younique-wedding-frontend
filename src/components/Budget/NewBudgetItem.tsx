import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props {}

interface BudgetItemInputs {
  name: string;
  plannedCost: number;
  actualCost: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 200
    }
  }
}));

const NewBudgetItem: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: "",
    plannedCost: 0,
    actualCost: 0
  });

  const validateForm = () => {
    return fields.name.length > 3;
  };

  const createBudgetItem = ({
    name,
    plannedCost,
    actualCost
  }: BudgetItemInputs) => {
    const body = {
      name,
      plannedCost,
      actualCost
    };

    return API.post(config.API.NAME, "/budget", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createBudgetItem(fields);
      history.push("/budget");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Name"
          id="name"
          placeholder="Buy Shoes"
          value={fields.name}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <TextField
          label="Planned Cost"
          id="planned-cost"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={fields.plannedCost}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Actual Cost"
          id="actual-cost"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={fields.actualCost}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
        />
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          disabled={!validateForm()}
          isLoading={isLoading}
          type="submit"
        >
          Add new budget item
        </LoadingButton>
      </form>
    </div>
  );
};

export default NewBudgetItem;
