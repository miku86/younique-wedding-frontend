import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { API, config, ROUTE } from "../../config";
import { useAppContext } from "../../utils/context";
import { BudgetItemInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { useApi } from "../../utils/hooks/useApi";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";

interface Props { }

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

const BudgetItems: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const [availableBudget, setAvailableBudget] = useState(0);
  const { t } = useTranslation();
  const [{ data, isLoading }, doFetch] = useApi(API.TODOS, []);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        doFetch(API.BUDGET);
      } catch (error) {
        onError(error);
      }
    })();
  }, [doFetch, isAuthenticated]);

  const fetchAvailableBudget = async () => {
    const [result] = await AMPLIFY.get(config.API.NAME, API.SETTINGS, {});
    setAvailableBudget(Number(result.availableBudget));
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
    return AMPLIFY.del(config.API.NAME, "API.BUDGET", {
      body: {
        budgetItemId,
      },
    });
  };

  const updateBudgetItem = (budgetItemId: string, data: any) => {
    return AMPLIFY.put(config.API.NAME, API.BUDGET, {
      body: { budgetItemId, data },
    });
  };

  const handleDelete = async (budgetItemId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteBudgetItem(budgetItemId);
      doFetch(API.BUDGET);
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
      doFetch(API.BUDGET);
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
      doFetch(API.BUDGET);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className={classes.budgetItems}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
          <>
            <Summary data={data || []} availableBudget={availableBudget} />

            <CustomTable
              data={data || []}
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
                  to={`${ROUTE.BUDGET}/new`}
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

export default BudgetItems;
