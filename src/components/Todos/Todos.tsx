import { makeStyles, Theme } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { API, ROUTES } from "../../config";
import { loadTodos } from "../../store/slices/todosSlice";
import { Todo } from "../../utils/customTypes";
import ItemNewButton from "../shared/ItemNewButton";
import ItemsSummary from "../shared/ItemsSummary";
import LoadingSpinner from "../shared/LoadingSpinner";
import TodosTable from "./TodosTable";

const useStyles = makeStyles((theme: Theme) => ({
  todos: {
    "& h1": {
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
    },
  },
}));

interface Props {
  isAuthenticated?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  loadTodos?: any;
  todos?: any;
}

export const Todos = ({ loadTodos, todos, isError, isLoading, isAuthenticated = true }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) return;
    loadTodos(API.TODOS);
  }, [isAuthenticated, loadTodos]);

  const handleUpdateBools = () => { };
  const handleUpdateTexts = () => { };
  const handleDelete = () => { };

  const amountItems = todos.length;
  const amountDoneItems = todos.filter((item: Todo) => item.done).length;

  return (
    <div className={classes.todos} data-testid="page-todos">
      {isError && <Alert severity="error" variant="filled" data-testid="loading-error">Fehler</Alert>}
      {isLoading && <LoadingSpinner data-testid="loading-indicator" />}

      <ItemsSummary
        title="done"
        amountItems={amountItems}
        amountDoneItems={amountDoneItems}
      />

      <TodosTable
        data={todos}
        handleUpdateBools={handleUpdateBools}
        handleUpdateTexts={handleUpdateTexts}
        handleDelete={handleDelete}
      />

      <ItemNewButton link={ROUTES.TODOSNEW} />
    </div >
  );
};

const mapStateToProps = (state: any) => ({
  isError: state.todos.isError,
  isLoading: state.todos.isLoading,
  todos: state.todos.items,
});

const mapDispatchToProps = {
  loadTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
