import { makeStyles, TableBody, TableCell, TableRow, Theme } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, Todo, TodoInputs } from "../../../../utils/customTypes";
import { getSorting, stableSort } from '../../../../utils/helpers';
import CheckingIcon from '../../../shared/CheckingIcon';
import TodoUpdate from './TodoUpdate';

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
}));

interface Props {
  data: Todo[];
  handleUpdateBools: any;
  handleUpdateTexts: any;
  handleDelete: any;
  order: Order;
  orderBy: keyof TodoInputs;
}

const TodosTableBody = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete, order, orderBy }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  const handleOpenUpdateDialog = (item: Todo) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <TableBody>
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map((item: any, index) => {
          const labelId = `${index}`;

          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={item.SK}>
              <TableCell align="center">
                <CheckingIcon
                  itemId={item.todoId}
                  fieldKey="done"
                  fieldValue={item.done}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell id={labelId} scope="item" align="center">
                {item.title}
              </TableCell>
              <TableCell align="center">{item.deadline}</TableCell>
              <TableCell align="center">{item.responsible}</TableCell>
              <TableCell align="center">{item.comment}</TableCell>
              <TableCell align="center">
                <Create
                  className={classes.updateButton}
                  onClick={() => handleOpenUpdateDialog(item)}
                />
                <Delete
                  className={classes.deleteButton}
                  onClick={() => handleDelete(item.todoId)}
                />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
          <TableRow>
            <TableCell align="left">{t("noEntries")}</TableCell>
          </TableRow>
        )}
      {openUpdateDialog && (
        <TodoUpdate
          item={selectedItemData}
          open={openUpdateDialog}
          handleClose={handleClose}
          handleSubmit={handleUpdateTexts}
        />
      )}
    </TableBody>
  )
}

export default TodosTableBody
