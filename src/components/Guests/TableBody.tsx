import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Guest } from "../../utils/customTypes";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "./Table";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  }
}));

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: any }, b: { [key in K]: any }) => number {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

interface Props {
  data: Guest[];
  order: Order;
  orderBy: string;
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
  handleUpdate: (todoId: string, fieldKey: string, fieldValue: boolean) => void;
}

const ExtendedTableBody: React.FC<Props> = ({
  data,
  order,
  orderBy,
  showDeleteButton,
  handleDelete,
  handleUpdate
}) => {
  const classes = useStyles();

  return (
    <TableBody>
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map(
          (
            {
              SK,
              name,
              sentSaveTheDate,
              sentInvite,
              receivedResponse,
              coming,
              comment,
              guestId
            },
            index
          ) => {
            const labelId = `${index}`;

            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={SK}>
                <TableCell id={labelId} scope="item" align="center">
                  {name}
                </TableCell>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={guestId}
                    fieldKey="sentSaveTheDate"
                    fieldValue={sentSaveTheDate}
                    handleClick={handleUpdate}
                  />
                </TableCell>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={guestId}
                    fieldKey="sentInvite"
                    fieldValue={sentInvite}
                    handleClick={handleUpdate}
                  />
                </TableCell>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={guestId}
                    fieldKey="receivedResponse"
                    fieldValue={receivedResponse}
                    handleClick={handleUpdate}
                  />
                </TableCell>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={guestId}
                    fieldKey="coming"
                    fieldValue={coming}
                    handleClick={handleUpdate}
                  />
                </TableCell>
                <TableCell align="center">{comment}</TableCell>
                {showDeleteButton && (
                  <TableCell align="center">
                    <Delete
                      className={classes.deleteButton}
                      onClick={() => handleDelete(guestId)}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          }
        )
      ) : (
        <TableRow>
          <TableCell align="left">You have no entry so far.</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ExtendedTableBody;
