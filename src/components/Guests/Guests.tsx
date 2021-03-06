import { makeStyles, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API, config, ROUTES } from "../../config";
import { deleteOne } from "../../utils/api/api";
import { useAppContext } from "../../utils/context";
import { Guest, GuestInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { useApiFetch } from "../../utils/hooks/useApiFetch";
import ItemNewButton from "../shared/ItemNewButton";
import ItemsSummary from "../shared/ItemsSummary";
import LoadingSpinner from "../shared/LoadingSpinner";
import GuestsTable from "./GuestsTable";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  guests: {
    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },
  },
}));

const Guests: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const { t } = useTranslation();
  const [{ data, isLoading }, doFetch] = useApiFetch(API.GUESTS, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    doFetch(API.GUESTS);
  }, [doFetch, isAuthenticated]);

  const updateGuest = (guestId: string, data: any) => {
    AMPLIFY.put(config.API.NAME, API.GUESTS, { body: { guestId, data } });
  };

  const handleDelete = async (itemId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));
    if (!confirmed) return;

    try {
      deleteOne(API.GUESTS, itemId);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateBools = async (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const data = {
      [fieldKey]: !fieldValue,
    };

    try {
      await updateGuest(guestId, data);
      doFetch(API.GUESTS);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateTexts = async (
    event: FormEvent<HTMLFormElement>,
    guestId: string,
    fields: GuestInputs
  ) => {
    event.preventDefault();

    try {
      await updateGuest(guestId, fields);
      doFetch(API.GUESTS);
    } catch (error) {
      onError(error);
    }
  };

  const amountItems = data.length;
  const amountDoneItems = data.filter((item: Guest) => item.coming).length;

  return (
    <div className={classes.guests} data-testid="page-guests">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
          <>
            <ItemsSummary
              title="coming"
              amountItems={amountItems}
              amountDoneItems={amountDoneItems}
            />

            <GuestsTable
              data={data}
              handleUpdateBools={handleUpdateBools}
              handleUpdateTexts={handleUpdateTexts}
              handleDelete={handleDelete}
            />

            <ItemNewButton link={ROUTES.GUESTSNEW} />
          </>
        )}
    </div>
  );
};

export default Guests;
