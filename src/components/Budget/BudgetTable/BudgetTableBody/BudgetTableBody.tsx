import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { BudgetItem, BudgetItemInputs, Order } from "../../../../utils/customTypes";
import { getSorting, stableSort } from "../../../../utils/helpers";
import CheckingIcon from "../../../shared/CheckingIcon";
import BudgetUpdate from "./BudgetUpdate";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
}));

interface Props {
  data: BudgetItem[];
  order: Order;
  orderBy: keyof BudgetItemInputs;
  handleDelete: (budgetItemId: string) => void;
  handleUpdateBools: (
    budgetItemId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: (
    event: FormEvent<HTMLFormElement>,
    budgetItemId: string,
    fields: BudgetItemInputs
  ) => void;
}

const BudgetTableBody: React.FC<Props> = ({
  data,
  order,
  orderBy,
  handleDelete,
  handleUpdateBools,
  handleUpdateTexts,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  const handleOpenUpdateDialog = (item: BudgetItem) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <TableBody data-testid="budget-table-body">
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map((item, index) => {
          const labelId = `${index}`;

          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={item.SK}>
              <TableCell align="center" data-testid="budget-table-body-done">
                <CheckingIcon
                  itemId={item.budgetItemId}
                  fieldKey="done"
                  fieldValue={item.done}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell id={labelId} scope="item" align="center" data-testid="budget-table-body-name">
                {item.name}
              </TableCell>
              <TableCell align="center" data-testid="budget-table-body-plannedcost">{item.plannedCost}</TableCell>
              <TableCell align="center" data-testid="budget-table-body-actualcost">{item.actualCost}</TableCell>
              <TableCell align="center">
                <Create
                  className={classes.updateButton}
                  onClick={() => handleOpenUpdateDialog(item)}
                  data-testid="budget-table-body-update"
                />
                <Delete
                  className={classes.deleteButton}
                  onClick={() => handleDelete(item.budgetItemId)}
                  data-testid="budget-table-body-delete"
                />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
          <TableRow>
            <TableCell align="left" data-testid="budget-table-body-no-entries">{t("noEntries")}</TableCell>
          </TableRow>
        )}
      {openUpdateDialog && (
        <BudgetUpdate
          item={selectedItemData}
          open={openUpdateDialog}
          handleClose={handleClose}
          handleSubmit={handleUpdateTexts}
        />
      )}
    </TableBody>
  );
};

export default BudgetTableBody;
