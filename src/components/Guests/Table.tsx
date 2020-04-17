import { Paper, Table, TableContainer } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { Guest, GuestInputs } from "../../utils/customTypes";
import ExtendedTableHead, { HeadCell, Order } from "../shared/TableHead";
import ExtendedTableBody from "./TableBody";

const headCells: HeadCell[] = [
  { id: "name", sorting: true },
  { id: "sentSaveTheDate", sorting: true },
  { id: "sentInvite", sorting: true },
  { id: "receivedResponse", sorting: true },
  { id: "coming", sorting: true },
  { id: "comment", sorting: false },
  { id: "options", sorting: false },
];

interface Props {
  data: Guest[];
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: (
    event: FormEvent<HTMLFormElement>,
    guestId: string,
    fields: GuestInputs
  ) => void;
}

const CustomTable: React.FC<Props> = ({
  data,
  handleDelete,
  handleUpdateBools,
  handleUpdateTexts,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof GuestInputs>("name");

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
