import { Paper, Table, TableContainer } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { BudgetItem, BudgetItemInputs, HeadCell, Order } from "../../../utils/customTypes";
import ItemsTableHeader from "../../shared/ItemsTableHeader";
import BudgetTableBody from "./BudgetTableBody";

const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "name", sorting: true },
  { id: "plannedCost", sorting: true },
  { id: "actualCost", sorting: true },
  { id: "options", sorting: false },
];

interface Props {
  data: BudgetItem[];
  handleDelete: (budgetItemId: string) => void;
  handleUpdateBools: (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: (
    event: FormEvent<HTMLFormElement>,
    budgetItemId: string,
    fields: BudgetItemInputs
  ) => void;
}

const BudgetTable: React.FC<Props> = ({
  data,
  handleDelete,
  handleUpdateBools,
  handleUpdateTexts,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof BudgetItemInputs>("name");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} data-testid="budget-table">
      <Table size="medium">
        <ItemsTableHeader
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
        />
        <BudgetTableBody
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

export default BudgetTable;
