import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config, API, ROUTE } from "../../config";
import { GuestInputs } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";
import { onError } from "../../utils/error";
import { useAppContext } from "../../utils/context";

interface Props {
}

const useStyles = makeStyles((theme: Theme) => ({
  guests: {
    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    }
  }
}));

const Guests: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState([]);
  const { t } = useTranslation();

  const fetchGuests = async () => {
    setIsLoading(true);
    const guests = await AMPLIFY.get(config.API.NAME, API.GUESTS, {});
    setGuests(guests);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        await fetchGuests();
      } catch (error) {
        onError(error);
      }
    })();
  }, [isAuthenticated]);

  const deleteGuest = async (guestId: string) => {
    setIsLoading(true);
    await AMPLIFY.del(config.API.NAME, API.GUESTS, {
      body: {
        guestId
      }
    });
  };

  const handleDelete = async (guestId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteGuest(guestId);
      await fetchGuests();
    } catch (error) {
      onError(error);
    }
  };

  const updateGuest = (guestId: string, data: any) => {
    setIsLoading(true);
    AMPLIFY.put(config.API.NAME, API.GUESTS, { body: { guestId, data } });
  };

  const handleUpdateBools = async (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const data = {
      [fieldKey]: !fieldValue
    };

    try {
      await updateGuest(guestId, data);
      await fetchGuests();
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
      await fetchGuests();
    } catch (error) {
      onError(error);
    }
  };

  const renderGuests = () => {
    return (
      <div className={classes.guests}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Summary data={guests} />

            <CustomTable
              data={guests}
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

  return <div>{isAuthenticated ? renderGuests() : <Landing />}</div>;
};

export default Guests;
