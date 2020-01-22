import { Paper, Table, TableContainer } from "@material-ui/core";
import React from "react";
import { BudgetItem } from "../../utils/customTypes";
import ExtendedTableBody from "./TableBody";
import ExtendedTableHead from "./TableHead";

export type Order = "asc" | "desc";

export interface Data {
  done: boolean;
  name: string;
  plannedCost: string;
  actualCost: string;
  options?: string;
}

interface Props {
  data: BudgetItem[];
  handleDelete: (guestId: string) => void;
  handleUpdate: (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
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
