import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props {}

interface GuestInputs {
  name: string;
  comment: string;
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

const NewGuest: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: "",
    comment: ""
  });

  const validateForm = () => {
    return fields.name.length > 3;
  };

  const createGuest = ({ name, comment }: GuestInputs) => {
    const body = {
      name,
      comment
    };

    return API.post(config.API.NAME, "/guests", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createGuest(fields);
      history.push("/guests");
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
          placeholder="Max Mustermann"
          value={fields.name}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <TextField
          label="Comment"
          id="comment"
          placeholder="Awesome Guest"
          value={fields.comment}
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
          Add new guest
        </LoadingButton>
      </form>
    </div>
  );
};

export default NewGuest;
