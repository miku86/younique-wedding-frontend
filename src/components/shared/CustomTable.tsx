import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";

interface Todo {
  [key: string]: any;
}

interface Props {
  data: Item[];
}

type Item = Todo;

const CustomTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: Item) => (
            <TableRow key={item.todoId}>
              <TableCell component="th" scope="item">
                {item.content}
              </TableCell>
              <TableCell align="right">
                {new Date(item.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
