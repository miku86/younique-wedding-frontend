import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { Order, Todo, TodoInputs } from '../../../utils/customTypes';
import TodosTableBody from './TodosTableBody';
import TodosTableHeader from './TodosTableHeader';

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
        <TodosTableHeader
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
