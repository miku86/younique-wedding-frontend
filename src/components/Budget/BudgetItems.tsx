import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import { BudgetItemInputs } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";
import { onError } from "../../utils/error";
import { useAppContext } from "../../utils/context";

interface Props {
}

const useStyles = makeStyles((theme: Theme) => ({
  budgetItems: {
    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    }
  }
}));

const BudgetItems: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [budgetItems, setBudgetItems] = useState([]);
  const [availableBudget, setAvailableBudget] = useState(0);
  const { t } = useTranslation();

  const fetchBudgetItems = async () => {
    setIsLoading(true);
    const budgetItems = await API.get(config.API.NAME, "/budget", {});
    setBudgetItems(budgetItems);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        await fetchBudgetItems();
      } catch (error) {
        onError(error);
      }
    })();
  }, [isAuthenticated]);

  const fetchAvailableBudget = async () => {
    setIsLoading(true);
    const [result] = await API.get(config.API.NAME, "/settings", {});
    setAvailableBudget(Number(result.availableBudget));
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        await fetchAvailableBudget();
      } catch (error) {
        onError(error);
      }
    })();
  }, [isAuthenticated]);

  const deleteBudgetItem = async (budgetItemId: string) => {
    setIsLoading(true);
    await API.del(config.API.NAME, "/budget", {
      body: {
        budgetItemId
      }
    });
  };

  const handleDelete = async (budgetItemId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteBudgetItem(budgetItemId);
      await fetchBudgetItems();
    } catch (error) {
      onError(error);
    }
  };

  const updateBudgetItem = (budgetItemId: string, data: any) => {
    setIsLoading(true);
    return API.put(config.API.NAME, "/budget", {
      body: { budgetItemId, data }
    });
  };

  const handleUpdateBools = async (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const data = {
      [fieldKey]: !fieldValue
    };

    try {
      await updateBudgetItem(budgetItemId, data);
      await fetchBudgetItems();
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
      await fetchBudgetItems();
    } catch (error) {
      onError(error);
    }
  };

  const renderBudgetItems = () => {
    return (
      <div className={classes.budgetItems}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Summary data={budgetItems} availableBudget={availableBudget} />

            <CustomTable
              data={budgetItems}
              handleDelete={handleDelete}
              handleUpdateBools={handleUpdateBools}
              handleUpdateTexts={handleUpdateTexts}
            />

            <Box display="flex" my={2}>
              <Box justifyContent="flex-start">
                <Link
                  color="inherit"
                  underline="none"
                  component={RouterLink}
                  to="/budget/new"
                >
                  <Fab color="primary" aria-label="add">
                    <Add />
                  </Fab>
                </Link>
              </Box>
            </Box>
          </>
        )}
      </div>
    );
  };

  return <div>{isAuthenticated ? renderBudgetItems() : <Landing />}</div>;
};

export default BudgetItems;
