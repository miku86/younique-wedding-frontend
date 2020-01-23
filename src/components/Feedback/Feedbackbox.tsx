import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, makeStyles, Radio, RadioGroup, Slide, Theme } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { API } from "aws-amplify";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { config } from "../../config";
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
      right: 20
    }
  },
  content: {
    padding: 20
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

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface Props {}

const Feedbackbox: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setValue] = React.useState("");

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
      feedback
    };

    try {
      const response = await API.post(config.API.NAME, "/sendFeedbackEmail", {
        body
      });
      response.MessageId && handleClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.feedbackbox}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {t("feedbackButton")}
      </Button>
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
            <form onSubmit={handleSubmit} className={classes.form}>
              <RadioGroup
                aria-label="feedback"
                name="feedback"
                value={feedback}
                onChange={handleChange}
              >
                {feedbackChoices.length &&
                  feedbackChoices.map(choice => (
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
                Senden
              </LoadingButton>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Feedbackbox;
