import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Todo } from "../../utils/customTypes";

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
  data: Todo[];
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
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
            <TableCell align="center">Done</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Responsible</TableCell>
            <TableCell align="center">Comment</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map((item: Todo) => (
              <TableRow key={item.SK}>
                <TableCell align="center">{item.done}</TableCell>
                <TableCell align="center">{item.title}</TableCell>
                <TableCell align="center">{item.deadline}</TableCell>
                <TableCell align="center">{item.responsible}</TableCell>
                <TableCell align="center">{item.comment}</TableCell>
                {showDeleteButton && (
                  <TableCell align="center">
                    <Delete
                      className={classes.deleteButton}
                      onClick={() => handleDelete(item.todoId)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
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
