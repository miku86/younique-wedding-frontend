import {
  makeStyles,
  TableBody,
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { BudgetItem, BudgetItemInputs } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";
import UpdateBudgetItem from "./UpdateBudgetItem";

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
  orderBy: string;
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

const ExtendedTableBody: React.FC<Props> = ({
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

  const handleClickOpen = (item: BudgetItem) => {
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
                  itemId={item.budgetItemId}
                  fieldKey="done"
                  fieldValue={item.done}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell id={labelId} scope="item" align="center">
                {item.name}
              </TableCell>
              <TableCell align="center">{item.plannedCost}</TableCell>
              <TableCell align="center">{item.actualCost}</TableCell>
              <TableCell align="center">
                <Create
                  className={classes.updateButton}
                  onClick={() => handleClickOpen(item)}
                />
                <Delete
                  className={classes.deleteButton}
                  onClick={() => handleDelete(item.budgetItemId)}
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
        <UpdateBudgetItem
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
