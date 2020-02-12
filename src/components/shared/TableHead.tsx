import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel, Theme } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,

    "& th": {
      color: "white"
    }
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
    width: 1
  }
}));

export interface HeadCell {
  id: string;
  sorting: boolean;
}

export type Order = "asc" | "desc";

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

const ExtendedTableHead: React.FC<Props> = ({
  order,
  orderBy,
  onRequestSort,
  headCells
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {headCells.map(headCell => {
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
  );
};

export default ExtendedTableHead;