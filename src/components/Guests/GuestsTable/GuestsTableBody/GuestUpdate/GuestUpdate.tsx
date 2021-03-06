import { Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Guest, GuestInputs } from "../../../../../utils/customTypes";
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
  item: Guest;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (
    event: FormEvent<HTMLFormElement>,
    guestId: string,
    fields: GuestInputs
  ) => void;
}

const GuestUpdate: React.FC<Props> = ({
  item,
  open,
  handleClose,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading] = useState(false);
  const [fields, handleFieldsChange] = useFormFields({
    name: item.name,
    comment: item.comment,
    sentSaveTheDate: item.sentSaveTheDate,
    sentInvite: item.sentInvite,
    receivedResponse: item.receivedResponse,
    coming: item.coming,
  });

  const validateForm = () => {
    return fields.name.length > 0;
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <div className={classes.content} data-testid="guest-update-form">
        <DialogTitle> {t("updateGuestHeading")}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => handleSubmit(event, item.guestId, fields)}
            className={classes.form}
          >
            <TextField
              label={t("name")}
              id="name"
              value={fields.name}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              autoFocus
              required
              data-testid="guest-update-name"
            />
            <TextField
              label={t("comment")}
              id="comment"
              value={fields.comment}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              data-testid="guest-update-comment"
            />

            <Button
              onClick={handleClose}
              color="primary"
              data-testid="guest-update-cancel">
              {t("cancel")}
            </Button>

            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              disabled={!validateForm()}
              isLoading={isLoading}
              type="submit"
              data-testid="guest-update-submit"
            >
              {t("save")}
            </LoadingButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default GuestUpdate;
