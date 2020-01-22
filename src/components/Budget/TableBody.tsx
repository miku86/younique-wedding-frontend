import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { BudgetItem } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  }
}));

interface Props {
  data: BudgetItem[];
  order: Order;
  orderBy: string;
  showDeleteButton: boolean;
  handleDelete: (budgetItemId: string) => void;
  handleUpdate: (
    budgetItemId: string,
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
            { SK, done, name, plannedCost, actualCost, budgetItemId },
            index
          ) => {
            const labelId = `${index}`;

            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={SK}>
                <TableCell align="center">
                  <CheckingIcon
                    itemId={budgetItemId}
                    fieldKey="done"
                    fieldValue={done}
                    handleClick={handleUpdate}
                  />
                </TableCell>

                <TableCell id={labelId} scope="item" align="center">
                  {name}
                </TableCell>
                <TableCell align="center">{plannedCost}</TableCell>
                <TableCell align="center">{actualCost}</TableCell>
                {showDeleteButton && (
                  <TableCell align="center">
                    <Delete
                      className={classes.deleteButton}
                      onClick={() => handleDelete(budgetItemId)}
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
