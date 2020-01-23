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
  const {t}= useTranslation()

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
        fetchGuests();
      } catch (error) {
        alert(error);
      }
    })();
  }, [isAuthenticated]);

  const deleteGuest = async (guestId: string) => {
    const body = {
      guestId
    };

    setIsLoading(true);
    await API.del(config.API.NAME, "/guests", { body });
    setIsLoading(false);
  };

  const handleDelete = async (guestId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteGuest(guestId);
      fetchGuests();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateGuest = (
    guestId: string,
    fieldKey: string,
    newFieldValue: boolean
  ) => {
    const body = {
      guestId,
      fieldKey,
      newFieldValue
    };

    return API.put(config.API.NAME, "/guests", { body });
  };

  const handleUpdate = async (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const newFieldValue = !fieldValue;

    setIsLoading(true);

    try {
      await updateGuest(guestId, fieldKey, newFieldValue);
      fetchGuests();
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
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
              handleUpdate={handleUpdate}
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
