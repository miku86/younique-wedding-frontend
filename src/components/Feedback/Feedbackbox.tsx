import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, makeStyles, Radio, RadioGroup, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { config } from "../../config";
import { onError } from "../../utils/error";
import LoadingButton from "../shared/LoadingButton";
import { feedbackChoices } from "./data";

const useStyles = makeStyles((theme: Theme) => ({
  feedbackbox: {
    position: "sticky",
    bottom: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.up("md")]: {
      position: "fixed",
      bottom: 20,
      right: 20,
    },
  },
  content: {
    padding: 20,
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

const Feedbackbox: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading] = useState(false);
  const [feedback, setValue] = useState("");

  const validateForm = () => {
    return feedback.length > 0;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      feedback,
    };

    try {
      const response = await AMPLIFY.post(
        config.API.NAME,
        "/sendFeedbackEmail",
        {
          body,
        }
      );
      response.MessageId && handleClose();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className={classes.feedbackbox}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {t("feedbackButton")}
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <div className={classes.content}>
          <DialogTitle> {t("feedbackHeading")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("feedbackText")}</DialogContentText>
            <form onSubmit={handleSubmit} className={classes.form}>
              <RadioGroup
                aria-label="feedback"
                name="feedback"
                value={feedback}
                onChange={handleChange}
              >
                {feedbackChoices.length &&
                  feedbackChoices.map((choice) => (
                    <FormControlLabel
                      key={choice.value}
                      control={<Radio />}
                      value={choice.value}
                      label={t(choice.value)}
                    />
                  ))}
              </RadioGroup>
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
                {t("send")}
              </LoadingButton>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Feedbackbox;
