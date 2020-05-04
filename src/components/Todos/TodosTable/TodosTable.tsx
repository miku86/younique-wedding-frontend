import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HeadCell, Order, Todo, TodoInputs } from "../../../utils/customTypes";
import { getSorting, stableSort } from "../../../utils/helpers";
import CheckingIcon from "../../shared/CheckingIcon";
import ItemsTableHeader from "../../shared/ItemsTableHeader";
import TodoUpdate from "./TodoUpdate";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
}));

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

const TodosTable = ({
  data,
  handleUpdateBools,
  handleUpdateTexts,
  handleDelete,
}: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TodoInputs>("done");
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenUpdateDialog = (item: Todo) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
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
        <TableBody data-testid="todos-table-body">
          {data.length ? (
            stableSort(data, getSorting(order, orderBy)).map((item: any, index) => {
              const labelId = `${index}`;

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={item.SK}>
                  <TableCell align="center" data-testid="todos-table-body-done">
                    <CheckingIcon
                      itemId={item.todoId}
                      fieldKey="done"
                      fieldValue={item.done}
                      handleClick={handleUpdateBools}
                    />
                  </TableCell>
                  <TableCell id={labelId} scope="item" align="center" data-testid="todos-table-body-title">
                    {item.title}
                  </TableCell>
                  <TableCell align="center" data-testid="todos-table-body-deadline">{item.deadline}</TableCell>
                  <TableCell align="center" data-testid="todos-table-body-responsible">{item.responsible}</TableCell>
                  <TableCell align="center" data-testid="todos-table-body-comment">{item.comment}</TableCell>
                  <TableCell align="center">
                    <Create
                      className={classes.updateButton}
                      onClick={() => handleOpenUpdateDialog(item)}
                      data-testid="todos-table-body-update"
                    />
                    <Delete
                      className={classes.deleteButton}
                      onClick={() => handleDelete(item.todoId)}
                      data-testid="todos-table-body-delete"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
              <TableRow>
                <TableCell align="left" data-testid="todos-table-body-no-entries">{t("noEntries")}</TableCell>
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

      </Table>
    </TableContainer>
  );
};

export default TodosTable;
