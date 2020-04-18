import { makeStyles, TextField, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { API, config, ROUTE } from "../../config";
import { TodoInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "60px 0",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    borderRadius: "6px",
    backgroundColor: "#FFF",
    padding: "50px",
    boxShadow:
      "0 7px 14px 0 rgba(60,66,87, 0.2) , 0 3px 6px 0 rgba(0,0,0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
      width: 200,
    },
  },
}));

const TodoNew: React.FC<Props> = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    title: "",
    deadline: "",
    responsible: "",
    comment: "",
  });
  const { t } = useTranslation();

  const validateForm = () => {
    return fields.title.length > 0;
  };

  const createTodo = ({
    title,
    deadline,
    responsible,
    comment,
  }: TodoInputs) => {
    const body = {
      title,
      deadline,
      responsible,
      comment,
    };

    return AMPLIFY.post(config.API.NAME, API.TODOS, { body });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createTodo(fields);
      history.push(ROUTE.TODOS);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label={t("title")}
            id="title"
            value={fields.title}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            autoFocus
            required
          />
          <TextField
            label={t("deadline")}
            id="deadline"
            value={fields.deadline}
            type="date"
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label={t("responsible")}
            id="responsible"
            value={fields.responsible}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label={t("comment")}
            id="comment"
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
            {t("add")}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default TodoNew;
