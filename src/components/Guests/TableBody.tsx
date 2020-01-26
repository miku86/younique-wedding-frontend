import { makeStyles, TableBody, TableCell, TableRow, Theme } from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Guest, GuestInputs } from "../../utils/customTypes";
import { getSorting, stableSort } from "../../utils/helpers";
import CheckingIcon from "../shared/CheckingIcon";
import { Order } from "../shared/TableHead";
import UpdateGuest from "./UpdateGuest";

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    cursor: "pointer"
  },
  updateButton: {
    cursor: "pointer"
  }
}));

interface Props {
  data: Guest[];
  order: Order;
  orderBy: string;
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

  const handleClickOpen = (item: Guest) => {
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
              <TableCell id={labelId} scope="item" align="center">
                {item.name}
              </TableCell>
              <TableCell align="center">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="sentSaveTheDate"
                  fieldValue={item.sentSaveTheDate}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="sentInvite"
                  fieldValue={item.sentInvite}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="receivedResponse"
                  fieldValue={item.receivedResponse}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center">
                <CheckingIcon
                  itemId={item.guestId}
                  fieldKey="coming"
                  fieldValue={item.coming}
                  handleClick={handleUpdateBools}
                />
              </TableCell>
              <TableCell align="center">{item.comment}</TableCell>

              <TableCell align="center">
                <Create
                  className={classes.updateButton}
                  onClick={() => handleClickOpen(item)}
                />
                <Delete
                  className={classes.deleteButton}
                  onClick={() => handleDelete(item.guestId)}
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
        <UpdateGuest
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
