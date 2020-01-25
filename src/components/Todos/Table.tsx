import { Paper, Table, TableContainer } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { Todo, TodoInputs } from "../../utils/customTypes";
import ExtendedTableHead, { HeadCell, Order } from "../shared/TableHead";
import ExtendedTableBody from "./TableBody";

interface Data {
  done: boolean;
  title: string;
  deadline: string;
  responsible: string;
  comment: string;
  options?: string;
}

const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "title", sorting: true },
  { id: "deadline", sorting: true },
  { id: "responsible", sorting: true },
  { id: "comment", sorting: true },
  { id: "options", sorting: false }
];

interface Props {
  data: Todo[];
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    todoId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: (
    event: FormEvent<HTMLFormElement>,
    todoId: string,
    fields: TodoInputs
  ) => void;
}

const CustomTable: React.FC<Props> = ({
  data,
  handleDelete,
  handleUpdateBools,
  handleUpdateTexts
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("done");

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
      <Table size="medium">
        <ExtendedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />
        <ExtendedTableBody
          data={data}
          order={order}
          orderBy={orderBy}
          handleDelete={handleDelete}
          handleUpdateBools={handleUpdateBools}
          handleUpdateTexts={handleUpdateTexts}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
