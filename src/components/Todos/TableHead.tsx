import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel, Theme } from "@material-ui/core";
import React from "react";

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

interface Data {
  done: boolean;
  title: string;
  deadline: string;
  responsible: string;
  comment: string;
  options: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  sorting: boolean;
}

const headCells: HeadCell[] = [
  { id: "done", label: "Done", sorting: true },
  { id: "title", label: "Title", sorting: true },
  { id: "deadline", label: "Deadline", sorting: true },
  { id: "responsible", label: "Responsible", sorting: true },
  { id: "comment", label: "Comment", sorting: true },
  { id: "options", label: "Options", sorting: false }
];

type Order = "asc" | "desc";

interface Props {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

const ExtendedTableHead: React.FC<Props> = ({
  order,
  orderBy,
  onRequestSort
}) => {
  const classes = useStyles();

  const createSortHandler = (property: keyof Data) => (
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
                {headCell.label}
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
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default ExtendedTableHead;
