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
  { id: "name", label: "Name", sorting: true },
  { id: "sentSaveTheDate", label: "Sent Save The Date?", sorting: true },
  { id: "sentInvite", label: "Sent Invite?", sorting: true },
  { id: "receivedResponse", label: "Received Response?", sorting: true },
  { id: "coming", label: "Coming?", sorting: true },
  { id: "comment", label: "Comment?", sorting: false },
  { id: "options", label: "Options", sorting: false }
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
