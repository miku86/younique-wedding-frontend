import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton/LoadingButton";

interface Props {}

interface Todo {
  content: string;
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
    content: ""
  });

  const validateForm = () => {
    return fields.content.length > 3;
  };

  const createTodo = ({ content }: Todo) => {
    const body = {
      content
    };

    return API.post("todos", "/todos", { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createTodo(fields);
      history.push("/");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Content"
          id="content"
          placeholder="Content"
          value={fields.content}
          onChange={handleFieldsChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
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
