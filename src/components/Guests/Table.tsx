import { Paper, Table, TableContainer } from "@material-ui/core";
import React from "react";
import { Guest } from "../../utils/customTypes";
import ExtendedTableHead, { HeadCell, Order } from "../shared/TableHead";
import ExtendedTableBody from "./TableBody";

interface Data {
  name: string;
  sentSaveTheDate: boolean;
  sentInvite: boolean;
  receivedResponse: boolean;
  coming: boolean;
  comment: string;
  options?: string;
}

const headCells: HeadCell[] = [
  { id: "name", sorting: true },
  { id: "sentSaveTheDate", sorting: true },
  { id: "sentInvite", sorting: true },
  { id: "receivedResponse", sorting: true },
  { id: "coming", sorting: true },
  { id: "comment", sorting: false },
  { id: "options", sorting: false }
];

interface Props {
  data: Guest[];
  handleDelete: (guestId: string) => void;
  handleUpdate: (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
}

const CustomTable: React.FC<Props> = ({ data, handleDelete, handleUpdate }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");

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
