import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { BudgetItem } from "../../utils/customTypes";
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
  data: BudgetItem[];
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
  handleUpdate: (
    budgetItemId: string,
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
            <TableCell align="center">Done</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Planned Cost</TableCell>
            <TableCell align="center">Actual Cost</TableCell>
            <TableCell align="center">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length ? (
            data.map(
              ({
                SK,
                done,
                name,
                plannedCost,
                actualCost,
                budgetItemId
              }: BudgetItem) => (
                <TableRow key={SK}>
                  <TableCell align="center">
                    <CheckingIcon
                      itemId={budgetItemId}
                      fieldKey="done"
                      fieldValue={done}
                      handleClick={handleUpdate}
                    />
                  </TableCell>
                  <TableCell align="center">{name}</TableCell>
                  <TableCell align="center">{plannedCost}</TableCell>
                  <TableCell align="center">{actualCost}</TableCell>
                  {showDeleteButton && (
                    <TableCell align="center">
                      <Delete
                        className={classes.deleteButton}
                        onClick={() => handleDelete(budgetItemId)}
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
