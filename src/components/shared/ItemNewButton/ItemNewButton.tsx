import { Box, Fab, Link } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  link: string;
}

const ItemNewButton = ({ link }: Props) => {
  return (
    <Box display="flex" my={2}>
      <Box justifyContent="flex-start">
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to={link}
          data-testid="item-new-button"
        >
          <Fab color="primary" aria-label="add" >
            <Add />
          </Fab>
        </Link>
      </Box>
    </Box>
  )
}

export default ItemNewButton
