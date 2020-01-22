import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Guest } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  }
}));

interface Props {
  data: Guest[];
  order: Order;
  orderBy: string;
  showDeleteButton: boolean;
  handleDelete: (guestId: string) => void;
  handleUpdate: (
    guestId: string,
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
  handleUpdate
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
          <TableCell align="left">{t("noEntries")}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default ExtendedTableBody;
