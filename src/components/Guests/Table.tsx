import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Guest } from "../../utils/customTypes";
import CheckingIcon from "../shared/CheckingIcon";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: "#3f51b5;",

    "& th": {
      color: "white"
    }
  },
  deleteButton: {
    cursor: "pointer"
  }
}));

interface Props {
  data: Guest[];
  showDeleteButton: boolean;
  handleDelete: any;
}

const CustomTable: React.FC<Props> = ({
  data,
  showDeleteButton,
  handleDelete
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Sent Save The Date?</TableCell>
            <TableCell align="center">Sent Invite?</TableCell>
            <TableCell align="center">Received Response?</TableCell>
            <TableCell align="center">Coming?</TableCell>
            <TableCell align="center">Comment?</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map(
              ({
                SK,
                name,
                sentSaveTheDate,
                sentInvite,
                receivedResponse,
                coming,
                comment,
                guestId
              }: Guest) => (
                <TableRow key={SK}>
                  <TableCell>{name}</TableCell>
                  <TableCell align="center">
                    <CheckingIcon property={sentSaveTheDate} />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon property={sentInvite} />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon property={receivedResponse} />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon property={coming} />
                  </TableCell>
                  <TableCell align="center">{comment}</TableCell>
                  {showDeleteButton && (
                    <TableCell align="right">
                      <Delete
                        className={classes.deleteButton}
                        onClick={() => handleDelete(guestId)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell align="left">You have no entry so far.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
