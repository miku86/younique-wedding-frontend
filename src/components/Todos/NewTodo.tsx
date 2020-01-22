import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props {}

interface TodoInputs {
  title: string;
  deadline: string;
  responsible: string;
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

const NewTodo: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    title: "",
    deadline: "",
    responsible: "",
    comment: ""
  });

  const validateForm = () => {
    return fields.title.length > 0;
  };

  const createTodo = ({
    title,
    deadline,
    responsible,
    comment
  }: TodoInputs) => {
    const body = {
      title,
      deadline,
      responsible,
      comment
    };

    return API.post(config.API.NAME, "/todos", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createTodo(fields);
      history.push("/todos");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Title"
          id="title"
          placeholder="Buy Shoes"
          value={fields.title}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <TextField
          label="Deadline"
          id="deadline"
          value={fields.deadline}
          type="date"
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="Responsible"
          id="responsible"
          placeholder="Max"
          value={fields.responsible}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Comment"
          id="comment"
          placeholder="Black"
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
          Add new todo
        </LoadingButton>
      </form>
    </div>
  );
};

export default NewTodo;
