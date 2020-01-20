import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Guest } from "../../utils/customTypes";
import CheckingIcon from "../shared/CheckingIcon";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,

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
  handleDelete: (guestId: string) => void;
  handleUpdate: (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
}

const CustomTable: React.FC<Props> = ({
  data,
  showDeleteButton,
  handleDelete,
  handleUpdate
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell align="center">Name</TableCell>
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
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={guestId}
                      fieldKey="sentSaveTheDate"
                      fieldValue={sentSaveTheDate}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={guestId}
                      fieldKey="sentInvite"
                      fieldValue={sentInvite}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={guestId}
                      fieldKey="receivedResponse"
                      fieldValue={receivedResponse}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={guestId}
                      fieldKey="coming"
                      fieldValue={coming}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">{comment}</TableCell>
                  {showDeleteButton && (
                    <TableCell align="center">
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
