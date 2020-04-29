import { Paper, Table, TableContainer } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { Guest, GuestInputs, HeadCell, Order } from "../../../utils/customTypes";
import ItemsTableHeader from "../../shared/ItemsTableHeader";
import GuestsTableBody from "./GuestsTableBody";

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
  handleDelete: (guestId: string) => void;
}

const GuestsTable = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete }: Props) => {
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
    <TableContainer component={Paper} data-testid="guests-table">
      <Table size="medium">
        <ItemsTableHeader
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
        />
        <GuestsTableBody
          data={data}
          handleUpdateBools={handleUpdateBools}
          handleUpdateTexts={handleUpdateTexts}
          handleDelete={handleDelete}
          order={order}
          orderBy={orderBy}

        />
      </Table>
    </TableContainer>
  );
};

export default GuestsTable;
