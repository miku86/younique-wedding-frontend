import { Paper, Table, TableContainer } from "@material-ui/core";
import React, { useState } from "react";
import { BudgetItem } from "../../utils/customTypes";
import ExtendedTableHead, { HeadCell, Order } from "../shared/TableHead";
import ExtendedTableBody from "./TableBody";

export interface Data {
  done: boolean;
  name: string;
  plannedCost: string;
  actualCost: string;
  options?: string;
}

const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "name", sorting: true },
  { id: "plannedCost", sorting: true },
  { id: "actualCost", sorting: true },
  { id: "options", sorting: false }
];

interface Props {
  data: BudgetItem[];
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
}

const CustomTable: React.FC<Props> = ({ data, handleDelete, handleUpdateBools }) => {
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
          showDeleteButton={true}
          handleDelete={handleDelete}
          handleUpdateBools={handleUpdateBools}
        />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
