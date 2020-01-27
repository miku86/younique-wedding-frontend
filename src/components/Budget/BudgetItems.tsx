import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import { TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";

interface Props {
  isAuthenticated: TisAuthenticated;
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

const BudgetItems: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [budgetItems, setBudgetItems] = useState([]);
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
        fetchBudgetItems();
      } catch (error) {
        alert(error);
      }
    })();
  }, [isAuthenticated]);

  const deleteBudgetItem = async (budgetItemId: string) => {
    const body = {
      budgetItemId
    };

    setIsLoading(true);
    await API.del(config.API.NAME, "/budget", { body });
    setIsLoading(false);
  };

  const handleDelete = async (budgetItemId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteBudgetItem(budgetItemId);
      fetchBudgetItems();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateBudgetItem = (
    budgetItemId: string,
    fieldKey: string,
    newFieldValue: boolean
  ) => {
    const body = {
      budgetItemId,
      fieldKey,
      newFieldValue
    };

    return API.put(config.API.NAME, "/budget", { body });
  };

  const handleUpdateBools = async (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const newFieldValue = !fieldValue;

    setIsLoading(true);

    try {
      await updateBudgetItem(budgetItemId, fieldKey, newFieldValue);
      fetchBudgetItems();
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const renderBudgetItems = () => {
    return (
      <div className={classes.budgetItems}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Summary data={budgetItems} />

            <CustomTable
              data={budgetItems}
              handleDelete={handleDelete}
              handleUpdateBools={handleUpdateBools}
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
