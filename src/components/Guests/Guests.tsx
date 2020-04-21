import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { API, config, ROUTE } from "../../config";
import { useAppContext } from "../../utils/context";
import { GuestInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { useApi } from "../../utils/hooks/useApi";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";


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
  const [{ data, isLoading }, doFetch] = useApi(API.GUESTS, []);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        doFetch(API.GUESTS);
      } catch (error) {
        onError(error);
      }
    })();
  }, [doFetch, isAuthenticated]);

  const deleteGuest = async (guestId: string) => {
    return AMPLIFY.del(config.API.NAME, API.GUESTS, {
      body: {
        guestId,
      },
    });
  };

  const updateGuest = (guestId: string, data: any) => {
    AMPLIFY.put(config.API.NAME, API.GUESTS, { body: { guestId, data } });
  };

  const handleDelete = async (guestId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteGuest(guestId);
      doFetch(API.GUESTS);
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

  return (
    <div className={classes.guests}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
          <>
            <Summary data={data || []} />

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
                  to={`${ROUTE.GUESTS}/new`}
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

export default Guests;
