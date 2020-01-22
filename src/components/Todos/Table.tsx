import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Todo } from "../../utils/customTypes";
import CheckingIcon from "../shared/CheckingIcon";
import ExtendedTableHead from "./TableHead";

const useStyles = makeStyles((theme: Theme) => ({
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

type Order = "asc" | "desc";

const CustomTable: React.FC<Props> = ({
  data,
  showDeleteButton,
  handleDelete,
  handleUpdate
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState("title");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <ExtendedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
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
