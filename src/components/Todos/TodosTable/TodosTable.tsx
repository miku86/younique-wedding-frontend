import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { HeadCell, Order, Todo, TodoInputs } from '../../../utils/customTypes';
import ItemsTableHeader from '../../shared/ItemsTableHeader';
import TodosTableBody from './TodosTableBody';

const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "title", sorting: true },
  { id: "deadline", sorting: true },
  { id: "responsible", sorting: true },
  { id: "comment", sorting: true },
  { id: "options", sorting: false },
];

interface Props {
  data: Todo[];
  handleUpdateBools: any;
  handleUpdateTexts: any;
  handleDelete: any;
}

const TodosTable = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TodoInputs>("done");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} data-testid="todos-table">
      <Table size="medium">
        <ItemsTableHeader
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
        />
        <TodosTableBody
          data={data}
          handleUpdateBools={handleUpdateBools}
          handleUpdateTexts={handleUpdateTexts}
          handleDelete={handleDelete}
          order={order}
          orderBy={orderBy}

        />
      </Table>
    </TableContainer>
  )
}

export default TodosTable
