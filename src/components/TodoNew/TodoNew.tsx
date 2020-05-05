import { makeStyles, TextField, Theme } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../config";
import { addTodo } from "../../store/slices/todosSlice";
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

interface Props {
  addTodo?: any;
  isError?: boolean;
}

export const TodoNew = ({ addTodo, isError }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let history = useHistory();
  const [fields, handleFieldsChange] = useFormFields({
    title: "",
    deadline: "",
    responsible: "",
    comment: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPropLongerThanZero(fields, "title")) {
      addTodo(fields)
        .then(() => {
          history.push(ROUTES.TODOS);
        })
        .catch((error: any) => {
          onError(error);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        {isError && <Alert severity="error" variant="filled" data-testid="server-error">Server didn't respond</Alert>}
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
            inputProps={{
              "data-testid": "todo-new-title"
            }}
          />
          <TextField
            label={t("deadline")}
            id="deadline"
            value={fields.deadline}
            onChange={handleFieldsChange}
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              "data-testid": "todo-new-deadline"
            }}
          />
          <TextField
            label={t("responsible")}
            id="responsible"
            value={fields.responsible}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            inputProps={{
              "data-testid": "todo-new-responsible"
            }}
          />
          <TextField
            label={t("comment")}
            id="comment"
            value={fields.comment}
            onChange={handleFieldsChange}
            variant="outlined"
            fullWidth
            inputProps={{
              "data-testid": "todo-new-comment"
            }}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isPropLongerThanZero(fields, "title")}
            type="submit"
            data-testid="todo-new-add"
          >
            {t("add")}
          </LoadingButton>

        </form>
      </div>
    </div >
  );
};

const mapStateToProps = (state: any) => ({
  isError: state.todos.isError,
});

const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoNew);
