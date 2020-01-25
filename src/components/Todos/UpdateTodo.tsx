import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, makeStyles, Slide, TextField, Theme } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Todo } from "../../utils/customTypes";
import { useFormFields } from "../../utils/hooks";
import LoadingButton from "../shared/LoadingButton";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  },
  updateButton: {
    cursor: "pointer"
  },
  content: {
    padding: 20
  },
  form: {
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      marginBottom: theme.spacing(3)
    }
  }
}));

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface Props {
  item: Todo;
  open: boolean;
  handleClose: any;
  handleSubmit: any;
}

const UpdateTodo: React.FC<Props> = ({
  item,
  open,
  handleClose,
  handleSubmit
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    title: item.title,
    deadline: item.deadline,
    responsible: item.responsible,
    comment: item.comment
  });

  const validateForm = () => {
    return fields.title.length > 0;
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <div className={classes.content}>
        <DialogTitle> {t("feedbackHeading")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("feedbackText")}</DialogContentText>
          <form
            onSubmit={event => handleSubmit(event, fields)}
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
                shrink: true
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

            <Button onClick={handleClose} color="primary">
              {t("cancel")}
            </Button>

            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              disabled={!validateForm()}
              isLoading={isLoading}
              type="submit"
            >
              {t("save")}
            </LoadingButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UpdateTodo;
