import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Todo } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  }
}));

interface Props {
  data: Todo[];
  order: Order;
  orderBy: string;
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    todoId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
}

const ExtendedTableBody: React.FC<Props> = ({
  data,
  order,
  orderBy,
  showDeleteButton,
  handleDelete,
  handleUpdateBools
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableBody>
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map(
          (
            { SK, done, title, deadline, responsible, comment, todoId },
            index
          ) => {
            const labelId = `${index}`;

            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={SK}>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={todoId}
                    fieldKey="done"
                    fieldValue={done}
                    handleClick={handleUpdateBools}
                  />
                </TableCell>

                <TableCell id={labelId} scope="item" align="center">
                  {title}
                </TableCell>
                <TableCell align="center">{deadline}</TableCell>
                <TableCell align="center">{responsible}</TableCell>
                <TableCell align="center">{comment}</TableCell>
                {showDeleteButton && (
                  <TableCell align="center">
                    <Delete
                      className={classes.deleteButton}
                      onClick={() => handleDelete(todoId)}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          }
        )
      ) : (
        <TableRow>
          <TableCell align="left">{t("noEntries")}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ExtendedTableBody;
