import { Paper, Table, TableContainer } from "@material-ui/core";
import React from "react";
import { Todo } from "../../utils/customTypes";
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
  { id: "done", label: "Done", sorting: true },
  { id: "title", label: "Title", sorting: true },
  { id: "deadline", label: "Deadline", sorting: true },
  { id: "responsible", label: "Responsible", sorting: true },
  { id: "comment", label: "Comment", sorting: true },
  { id: "options", label: "Options", sorting: false }
];

interface Props {
  data: Todo[];
  handleDelete: (guestId: string) => void;
  handleUpdate: (todoId: string, fieldKey: string, fieldValue: boolean) => void;
}

const CustomTable: React.FC<Props> = ({ data, handleDelete, handleUpdate }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("done");

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
          showDeleteButton={true}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
