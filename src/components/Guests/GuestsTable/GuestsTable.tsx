import { Paper, Table, TableContainer } from '@material-ui/core';
import React, { useState } from 'react';
import { Guest, GuestInputs, Order } from '../../../utils/customTypes';
import GuestsTableBody from './GuestsTableBody';
import GuestsTableHeader from './GuestsTableHeader';

interface Props {
  data: Guest[];
  handleUpdateBools: any;
  handleUpdateTexts: any;
  handleDelete: any;
}

const GuestsTable = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof GuestInputs>("name");

  const handleRequestSort = (property: any) => (event: React.MouseEvent<unknown>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} data-testid="guests-table">
      <Table size="medium">
        <GuestsTableHeader
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
  )
}

export default GuestsTable
