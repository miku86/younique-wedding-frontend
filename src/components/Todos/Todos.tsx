import { makeStyles, Theme } from "@material-ui/core";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API, config, ROUTE } from "../../config";
import { useAppContext } from "../../utils/context";
import { Todo, TodoInputs } from "../../utils/customTypes";
import { onError } from "../../utils/error";
import { useApi } from "../../utils/hooks/useApi";
import ItemNewButton from "../shared/ItemNewButton";
import LoadingSpinner from "../shared/LoadingSpinner";
import TodosSummary from "./TodosSummary";
import TodosTable from "./TodosTable";

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
}));

const Todos: React.FC<Props> = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAppContext();
  const { t } = useTranslation();
  const [{ data, isLoading }, doFetch] = useApi(API.TODOS, []);

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

  const handleDelete = async (todoId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await AMPLIFY.del(config.API.NAME, API.TODOS, { body: { todoId } });
      doFetch(API.TODOS);
    } catch (error) {
      onError(error);
    }
  };

  const updateTodo = (todoId: string, data: any) => {
    return AMPLIFY.put(config.API.NAME, API.TODOS, { body: { todoId, data } });
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

  const amountItems = data.length;
  const amountDoneItems = data.filter((item: Todo) => item.done).length;

  return (
    <div className={classes.todos} data-testid="page-todos">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
          <>
            <TodosSummary
              amountItems={amountItems}
              amountDoneItems={amountDoneItems}
            />

            <TodosTable
              data={data}
              handleUpdateBools={handleUpdateBools}
              handleUpdateTexts={handleUpdateTexts}
              handleDelete={handleDelete}
            />

            <ItemNewButton link={ROUTE.TODOSNEW} />
          </>
        )}
    </div>
  );
};

export default Todos;
