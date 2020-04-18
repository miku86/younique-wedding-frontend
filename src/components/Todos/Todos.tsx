import { Box, Card, CardContent, Fab, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Theme, Typography } from "@material-ui/core";
import { Add, CheckCircleOutline, Create, Delete } from "@material-ui/icons";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { API, config, ROUTE } from "../../config";
import { useAppContext } from "../../utils/context";
import { HeadCell, Order, Todo, TodoInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { getSorting, stableSort } from "../../utils/helpers";
import { useApi } from "../../utils/hooks/useApi";
import CheckingIcon from "../shared/CheckingIcon";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import UpdateTodo from "./UpdateTodo";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  todos: {
    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      margin: "10px 0",
    },
  },
  card: {
    border: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "16px",
    },

    [theme.breakpoints.up("md")]: {
      width: "240px",
      margin: "20px 0",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: theme.palette.primary.main,
  },
  deleteButton: {
    cursor: "pointer",
  },
  updateButton: {
    cursor: "pointer",
  },
  head: {
    backgroundColor: theme.palette.primary.main,

    "& th": {
      color: "white",
    },
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const headCells: HeadCell[] = [
  { id: "done", sorting: true },
  { id: "title", sorting: true },
  { id: "deadline", sorting: true },
  { id: "responsible", sorting: true },
  { id: "comment", sorting: true },
  { id: "options", sorting: false },
];

const Todos: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TodoInputs>("done");
  const [{ data, isLoading, isError }, doFetch] = useApi(API.TODOS, []);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        doFetch(API.TODOS);
      } catch (error) {
        onError(error);
      }
    })();
  }, [doFetch, isAuthenticated]);

  const deleteTodo = (todoId: string) => {
    return AMPLIFY.del(config.API.NAME, API.TODOS, {
      body: {
        todoId,
      },
    });
  };

  const updateTodo = (todoId: string, data: any) => {
    return AMPLIFY.put(config.API.NAME, API.TODOS, { body: { todoId, data } });
  };

  const handleDelete = async (todoId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteTodo(todoId);
      doFetch(API.TODOS);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateBools = async (
    todoId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const data = {
      [fieldKey]: !fieldValue,
    };

    try {
      await updateTodo(todoId, data);
      doFetch(API.TODOS);
    } catch (error) {
      onError(error);
    }
  };

  const handleUpdateTexts = async (
    event: FormEvent<HTMLFormElement>,
    todoId: string,
    fields: TodoInputs
  ) => {
    event.preventDefault();

    try {
      await updateTodo(todoId, fields);
      doFetch(API.TODOS);
    } catch (error) {
      onError(error);
    }
  };

  const handleRequestSort = (property: any) => (event: React.MouseEvent<unknown>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClickOpen = (item: Todo) => {
    setSelectedItemData(item);
    setOpenUpdateDialog(true);
  };

  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  const renderTodos = () => {
    const amountItems = data.length;
    const amountDoneItems = data.filter((item: Todo) => item.done).length;

    return (
      <div className={classes.todos}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
            <>
              <div className={classes.summary}>
                <Card className={classes.card}>
                  <CheckCircleOutline
                    style={{ fontSize: 32, color: "#e33371" }}
                  />
                  <CardContent className={classes.content}>
                    <Typography
                      component="h5"
                      variant="h5"
                      className={classes.text}
                    >
                      {`${amountDoneItems} /  ${amountItems}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {t("done")}
                    </Typography>
                  </CardContent>
                </Card>
              </div>

              <TableContainer component={Paper}>
                <Table size="medium">
                  <TableHead className={classes.head}>
                    <TableRow>
                      {headCells.map((headCell) => {
                        return headCell.sorting ? (
                          <TableCell
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                            align="center"
                          >
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : "asc"}
                              onClick={handleRequestSort(headCell.id)}
                            >
                              {t(headCell.id)}
                              {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                                </span>
                              ) : null}
                            </TableSortLabel>
                          </TableCell>
                        ) : (
                            <TableCell key={headCell.id} align="center">
                              {t(headCell.id)}
                            </TableCell>
                          );
                      })}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.length ? (
                      stableSort(data, getSorting(order, orderBy)).map((item: any, index) => {
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
                </Table>
              </TableContainer>

              <Box display="flex" my={2}>
                <Box justifyContent="flex-start">
                  <Link
                    color="inherit"
                    underline="none"
                    component={RouterLink}
                    to={`${ROUTE.TODOS}/new`}
                  >
                    <Fab color="primary" aria-label="add">
                      <Add />
                    </Fab>
                  </Link>
                </Box>
              </Box>
            </>
          )}
      </div>
    );
  };

  return <div>{isAuthenticated ? renderTodos() : <Landing />}</div>;
};

export default Todos;
