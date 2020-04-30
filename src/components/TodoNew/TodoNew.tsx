import { makeStyles, TextField, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { API, ROUTES } from "../../config";
import { createOne } from "../../utils/api/api";
import { TodoInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { isPropLongerThanZero } from "../../utils/helpers";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

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

interface Props { }

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

  const createItem = ({ title, deadline, responsible, comment }: TodoInputs) => {
    return createOne(API.TODOS, {
      title,
      deadline,
      responsible,
      comment,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createItem(fields);
      history.push(ROUTES.TODOS);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root} data-testid="page-todo-new">
      <div className={classes.card}>
        <form onSubmit={handleSubmit} className={classes.form} data-testid="todo-new-form">
          <TextField
            label={t("title")}
            id="title"
            value={fields.title}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            autoFocus
            required
            data-testid="todo-new-title"
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
            data-testid="todo-new-deadline"
          />
          <TextField
            label={t("responsible")}
            id="responsible"
            value={fields.responsible}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            data-testid="todo-new-responsible"
          />
          <TextField
            label={t("comment")}
            id="comment"
            value={fields.comment}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            data-testid="todo-new-comment"
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isPropLongerThanZero(fields, "title")}
            isLoading={isLoading}
            type="submit"
            data-testid="todo-new-add"
          >
            {t("add")}
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default TodoNew;