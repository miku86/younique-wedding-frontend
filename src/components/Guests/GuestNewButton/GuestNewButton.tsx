import { Box, Fab, Link } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ROUTE } from "../../../config";

interface Props {

}

const GuestNewButton = (props: Props) => {
  return (
    <Box display="flex" my={2}>
      <Box justifyContent="flex-start">
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to={`${ROUTE.GUESTSNEW}`}
        >
          <Fab color="primary" aria-label="add" data-testid="guest-new-button">
            <Add />
          </Fab>
        </Link>
      </Box>
    </Box>
  )
}

export default GuestNewButton
