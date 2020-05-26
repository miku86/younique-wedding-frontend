import { makeStyles, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { deleteOne } from "../../api";
import { API, config, ROUTES } from "../../config";
import { fetchAll } from "../../store/slices/budgetSlice";
import { useAppContext } from "../../utils/context";
import { BudgetItem, BudgetItemInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { formatter } from "../../utils/format";
import ItemNewButton from "../shared/ItemNewButton";
import ItemsSummary from "../shared/ItemsSummary";
import LoadingSpinner from "../shared/LoadingSpinner";
import BudgetTable from "./BudgetTable";

interface Props {
  data: BudgetItem[];
  fetchAll: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  budgetItems: {
    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },
  },
}));

const Budget: React.FC<Props> = ({ data, fetchAll }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isAuthenticated } = useAppContext();
  const [availableBudget, setAvailableBudget] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAll(API.BUDGET);
  }, [fetchAll, isAuthenticated]);

  const fetchAvailableBudget = async () => {
    const [result] = await AMPLIFY.get(config.API.NAME, API.SETTINGS, {});
    setAvailableBudget(Number(result.availableBudget));
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;

      try {
        await fetchAvailableBudget();
      } catch (error) {
        onError(error);
      }
    })();
  }, [isAuthenticated]);

  const updateBudgetItem = (budgetItemId: string, data: any) => {
    return AMPLIFY.put(config.API.NAME, API.BUDGET, {
      body: { budgetItemId, data },
    });
  };

  const handleDelete = async (itemId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));
    if (!confirmed) return;

    try {
      deleteOne(API.BUDGET, itemId);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateBools = async (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const data = {
      [fieldKey]: !fieldValue,
    };

    try {
      await updateBudgetItem(budgetItemId, data);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateTexts = async (
    event: FormEvent<HTMLFormElement>,
    budgetItemId: string,
    fields: BudgetItemInputs
  ) => {
    event.preventDefault();

    try {
      await updateBudgetItem(budgetItemId, fields);
    } catch (error) {
      onError(error);
    }
  };

  const actualCosts = data.reduce((total: number, currentItem: BudgetItem) => {
    return total + Number(currentItem.actualCost);
  }, 0);

  const amountItems = formatter.format(availableBudget);
  const amountDoneItems = formatter.format(availableBudget - actualCosts);

    // TODO: add state
  const isLoading = false;

  return (
    <div className={classes.budgetItems} data-testid="page-budget">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ItemsSummary
            title="availableBudget"
            amountItems={amountItems}
            amountDoneItems={amountDoneItems}
          />

          <BudgetTable
            data={data}
            handleUpdateBools={handleUpdateBools}
            handleUpdateTexts={handleUpdateTexts}
            handleDelete={handleDelete}
          />

          <ItemNewButton link={ROUTES.BUDGETNEW} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.budget.items,
});

const mapDispatchToProps = {
  fetchAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
