import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import { GuestInputs, TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";

interface Props {
  isAuthenticated: TisAuthenticated;
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

const Guests: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [guests, setGuests] = useState([]);
  const { t } = useTranslation();

  const fetchGuests = async () => {
    setIsLoading(true);
    const guests = await API.get(config.API.NAME, "/guests", {});
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
        alert(error);
      }
    })();
  }, [isAuthenticated]);

  const deleteGuest = async (guestId: string) => {
    setIsLoading(true);
    await API.del(config.API.NAME, "/guests", {
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
      alert(error.message);
    }
  };

  const updateGuest = (guestId: string, data: any) => {
    setIsLoading(true);
    API.put(config.API.NAME, "/guests", { body: { guestId, data } });
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
      alert(error.message);
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
      alert(error.message);
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
                  to="/guests/new"
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
