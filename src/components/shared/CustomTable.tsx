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
  }
}));

interface Props {
  data: Todo[];
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
            <TableCell>Title</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Responsible</TableCell>
            <TableCell align="right">Comment</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: Todo) => (
            <TableRow key={item.SK}>
              <TableCell component="th" scope="item">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.deadline}</TableCell>
              <TableCell align="right">{item.responsible}</TableCell>
              <TableCell align="right">{item.comment}</TableCell>
              {showDeleteButton && (
                <TableCell align="right">
                  <Delete onClick={() => handleDelete(item.todoId)} />
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
