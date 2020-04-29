import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Guest, GuestInputs, Order } from "../../../../utils/customTypes";
import { getSorting, stableSort } from "../../../../utils/helpers";
import CheckingIcon from "../../../shared/CheckingIcon";
import GuestUpdate from "./GuestUpdate";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
}));

interface Props {
  data: Guest[];
  order: Order;
  orderBy: keyof GuestInputs;
  handleDelete: (guestId: string) => void;
  handleUpdateBools: (
    guestId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => void;
  handleUpdateTexts: (
    event: FormEvent<HTMLFormElement>,
    guestId: string,
    fields: GuestInputs
  ) => void;
}

const GuestsTableBody = ({ data, handleUpdateBools, handleUpdateTexts, handleDelete, order, orderBy }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  const handleOpenUpdateDialog = (item: Guest) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <TableBody data-testid="guests-table-body">
      {data.length ? (
        stableSort(data, getSorting(order, orderBy)).map((item: any, index) => {
          const labelId = `${index}`;

          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={item.SK}>
              <TableCell id={labelId} scope="item" align="center" data-testid="guests-table-body-name">
                {item.name}
              </TableCell>
              <TableCell align="center" data-testid="guests-table-body-sentsavethedate">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="sentSaveTheDate"
                  fieldValue={item.sentSaveTheDate}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center" data-testid="guests-table-body-sentinvite">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="sentInvite"
                  fieldValue={item.sentInvite}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center" data-testid="guests-table-body-receivedresponse">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="receivedResponse"
                  fieldValue={item.receivedResponse}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center" data-testid="guests-table-body-coming">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="coming"
                  fieldValue={item.coming}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center" data-testid="guests-table-body-comment">{item.comment}</TableCell>

              <TableCell align="center">
                <Create
                  className={classes.updateButton}
                  onClick={() => handleOpenUpdateDialog(item)}
                  data-testid="guests-table-body-update"
                />
                <Delete
                  className={classes.deleteButton}
                  onClick={() => handleDelete(item.guestId)}
                  data-testid="guests-table-body-delete"
                />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
          <TableRow>
            <TableCell align="left" data-testid="guests-table-body-no-entries">{t("noEntries")}</TableCell>
          </TableRow>
        )}
      {openUpdateDialog && (
        <GuestUpdate
          item={selectedItemData}
          open={openUpdateDialog}
          handleClose={handleClose}
          handleSubmit={handleUpdateTexts}
        />
      )}
    </TableBody>
  );
};

export default GuestsTableBody;
