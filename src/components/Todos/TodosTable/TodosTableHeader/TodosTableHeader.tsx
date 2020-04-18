import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeadCell, Order, OrderBy } from '../../../../utils/customTypes';

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,

    "& th": {
      color: "white",
    },
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));


const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "title", sorting: true },
  { id: "deadline", sorting: true },
  { id: "responsible", sorting: true },
  { id: "comment", sorting: true },
  { id: "options", sorting: false },
];

interface Props {
  order: Order;
  orderBy: OrderBy;
  handleRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const TodosTableHeader = ({ order, orderBy, handleRequestSort }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead className={classes.head} data-testid="todos-table-header">
      <TableRow>
        {headCells.map((headCell) => {
          return headCell.sorting ? (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              align="center"
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {t(headCell.id)}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : (
              <TableCell key={headCell.id} align="center">
                {t(headCell.id)}
              </TableCell>
            );
        })}
      </TableRow>
    </TableHead>
  )
}

export default TodosTableHeader
