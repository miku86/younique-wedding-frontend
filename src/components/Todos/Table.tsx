import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Todo } from "../../utils/customTypes";
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
  data: Todo[];
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
  handleUpdate: (todoId: string, fieldKey: string, fieldValue: boolean) => void;
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
            data.map(
              ({
                SK,
                done,
                title,
                deadline,
                responsible,
                comment,
                todoId
              }: Todo) => (
                <TableRow key={SK}>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={todoId}
                      fieldKey="done"
                      fieldValue={done}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">{title}</TableCell>
                  <TableCell align="center">{deadline}</TableCell>
                  <TableCell align="center">{responsible}</TableCell>
                  <TableCell align="center">{comment}</TableCell>
                  {showDeleteButton && (
                    <TableCell align="center">
                      <Delete
                        className={classes.deleteButton}
                        onClick={() => handleDelete(todoId)}
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
