import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Todo } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";
import UpdateTodo from "./UpdateTodo";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  },
  updateButton: {
    cursor: "pointer"
  },
}));

interface Props {
  data: Todo[];
  order: Order;
  orderBy: string;
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    todoId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: any;
}

const ExtendedTableBody: React.FC<Props> = ({
  data,
  order,
  orderBy,
  handleDelete,
  handleUpdateBools,
  handleUpdateTexts
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  const handleClickOpen = (item: Todo) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <TableBody>
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map((item, index) => {
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
                  onClick={() => handleClickOpen(item)}
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
        <UpdateTodo
          item={selectedItemData}
          open={openUpdateDialog}
          handleClose={handleClose}
          handleSubmit={handleUpdateTexts}
        />
      )}
    </TableBody>
  );
};

export default ExtendedTableBody;
