import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { API } from "../../../../config";
import { useAppContext } from "../../../../utils/context";
import { Order, Todo, TodoInputs } from "../../../../utils/customTypes";
import { getSorting, stableSort } from "../../../../utils/helpers";
import { fetchAll } from "../../../../utils/store/todos/actions";
import CheckingIcon from "../../../shared/CheckingIcon";
import TodoUpdate from "./TodoUpdate";

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
  fetchAll: any;
}

const TodosTableBody = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete, order, orderBy, fetchAll }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAll(API.TODOS);
  }, [fetchAll, isAuthenticated]);

  const handleOpenUpdateDialog = (item: Todo) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
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
  );
};

const mapStateToProps = (state: any) => ({
  data: state.todos.items,
});

const mapDispatchToProps = {
  fetchAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosTableBody);
