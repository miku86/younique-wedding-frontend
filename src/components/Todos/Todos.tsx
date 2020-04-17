import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API as AMPLIFY } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config, API, ROUTE } from "../../config";
import { TodoInputs } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";
import { onError } from "../../utils/error";
import { useAppContext } from "../../utils/context";

interface Props {
}

const useStyles = makeStyles((theme: Theme) => ({
  todos: {
    "& h1": {
      fontWeight: "600"
    },
    "& p": {
      color: "#666"
    }
  }
}));

const Todos: React.FC<Props> = () => {
  const classes = useStyles();
  const {isAuthenticated} = useAppContext();
  const [todos, setTodos] = useState(null);
  const { t } = useTranslation();

  const fetchTodos = async () => {
    const todos = await AMPLIFY.get(config.API.NAME, API.TODOS, {});
    setTodos(todos);
  };

  const deleteTodo = (todoId: string) => {
    return AMPLIFY.del(config.API.NAME, API.TODOS, {
      body: {
        todoId
      }
    });
  };

  const updateTodo = (todoId: string, data: any) => {
    return AMPLIFY.put(config.API.NAME, API.TODOS, { body: { todoId, data } });
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        fetchTodos();
      } catch (error) {
        onError(error);
      }
    })();
  }, [isAuthenticated]);


  const handleDelete = async (todoId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteTodo(todoId);
      fetchTodos();
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
      [fieldKey]: !fieldValue
    };

    try {
      await updateTodo(todoId, data);
      fetchTodos();
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
      fetchTodos();
    } catch (error) {
      onError(error);
    }
  };

  const renderTodos = () => {
    return (
      <div className={classes.todos}>
        {todos === null ? (
          <LoadingSpinner />
        ) : (
          <>
            <Summary data={todos || []} />

            <CustomTable
              data={todos || []}
              handleDelete={handleDelete}
              handleUpdateBools={handleUpdateBools}
              handleUpdateTexts={handleUpdateTexts}
            />

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
