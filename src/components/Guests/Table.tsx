import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Guest } from "../../utils/customTypes";

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
            <TableCell align="right">Sent Save The Date?</TableCell>
            <TableCell align="right">Sent Invite?</TableCell>
            <TableCell align="right">Received Response?</TableCell>
            <TableCell align="right">Coming?</TableCell>
            <TableCell align="right">Comment?</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: Guest) => (
            <TableRow key={item.SK}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.sentSaveTheDate}</TableCell>
              <TableCell align="right">{item.sentInvite}</TableCell>
              <TableCell align="right">{item.receivedResponse}</TableCell>
              <TableCell align="right">{item.coming}</TableCell>
              <TableCell align="right">{item.comment}</TableCell>
              {showDeleteButton && (
                <TableCell align="right">
                  <Delete
                    className={classes.deleteButton}
                    onClick={() => handleDelete(item.guestId)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
