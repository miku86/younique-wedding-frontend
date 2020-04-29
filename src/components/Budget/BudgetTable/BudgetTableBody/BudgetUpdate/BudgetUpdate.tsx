import { Button, Dialog, DialogContent, DialogTitle, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { BudgetItem, BudgetItemInputs } from "../../../../../utils/customTypes";
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
  item: BudgetItem;
  open: boolean;
  handleClose: () => void;
  handleSubmit: (
    event: FormEvent<HTMLFormElement>,
    budgetItemId: string,
    fields: BudgetItemInputs
  ) => void;
}

const BudgetUpdate: React.FC<Props> = ({
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
    plannedCost: item.plannedCost,
    actualCost: item.actualCost,
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
      <div className={classes.content} data-testid="budget-update-form">
        <DialogTitle> {t("updateBudgetItemHeading")}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => handleSubmit(event, item.budgetItemId, fields)}
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
              data-testid="budget-update-name"
            />
            <TextField
              label={t("plannedCost")}
              id="plannedCost"
              type="number"
              value={fields.plannedCost}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              data-testid="budget-update-plannedcost"
            />
            <TextField
              label={t("actualCost")}
              id="actualCost"
              type="number"
              value={fields.actualCost}
              onChange={handleFieldsChange}
              variant="outlined"
              fullWidth
              data-testid="budget-update-actualcost"
            />

            <Button
              onClick={handleClose}
              color="primary"
              data-testid="budget-update-cancel"
            >
              {t("cancel")}
            </Button>

            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              disabled={!validateForm()}
              isLoading={isLoading}
              type="submit"
              data-testid="budget-update-submit"
            >
              {t("save")}
            </LoadingButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default BudgetUpdate;
