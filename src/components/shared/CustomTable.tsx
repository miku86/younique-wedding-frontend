import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  head: {
    backgroundColor: "#3f51b5;",
    
    "& th": {
      color: "white"
    }
  }
}));

interface Todo {
  [key: string]: any;
}

interface Props {
  data: Item[];
}

type Item = Todo;

const CustomTable: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Responsible</TableCell>
            <TableCell align="right">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: Item) => (
            <TableRow key={item.SK}>
              <TableCell component="th" scope="item">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.deadline}</TableCell>
              <TableCell align="right">{item.responsible}</TableCell>
              <TableCell align="right">{item.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
