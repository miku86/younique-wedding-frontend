import { Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Todo, TodoInputs } from "../../../../../utils/customTypes";
import { useFormFields } from "../../../../../utils/hooks";
import LoadingButton from "../../../../shared/LoadingButton";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
  content: {
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3),
    },
  },
}));

interface Props {
  item: Todo;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (
    event: FormEvent<HTMLFormElement>,
    todoId: string,
    fields: TodoInputs
  ) => void;
}

const TodoUpdate: React.FC<Props> = ({
  item,
  open,
  handleClose,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    title: item.title,
    deadline: item.deadline,
    responsible: item.responsible,
    comment: item.comment,
  });

  const validateForm = () => {
    return fields.title.length > 0;
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <div className={classes.content} data-testid="todo-update-form">
        <DialogTitle> {t("updateTodoHeading")}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => handleSubmit(event, item.todoId, fields)}
            className={classes.form}
          >
            <TextField
              label={t("title")}
              id="title"
              value={fields.title}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              autoFocus
              required
              data-testid="todo-update-title"
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
              data-testid="todo-update-deadline"
            />
            <TextField
              label={t("responsible")}
              id="responsible"
              value={fields.responsible}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              data-testid="todo-update-responsible"
            />
            <TextField
              label={t("comment")}
              id="comment"
              value={fields.comment}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              data-testid="todo-update-comment"
            />

            <Button onClick={handleClose} color="primary" data-testid="todo-update-cancel">
              {t("cancel")}
            </Button>

            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              disabled={!validateForm()}
              isLoading={isLoading}
              type="submit"
              data-testid="todo-update-submit"
            >
              {t("save")}
            </LoadingButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default TodoUpdate;
