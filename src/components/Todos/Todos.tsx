import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import { TisAuthenticated, TodoInputs } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";

interface Props {
  isAuthenticated: TisAuthenticated;
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

const Todos: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const { t } = useTranslation();

  const fetchTodos = async () => {
    setIsLoading(true);
    const todos = await API.get(config.API.NAME, "/todos", {});
    setTodos(todos);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        fetchTodos();
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    })();
  }, [isAuthenticated]);

  const deleteTodo = async (todoId: string) => {
    setIsLoading(true);
    await API.del(config.API.NAME, "/todos", {
      body: {
        todoId
      }
    });
  };

  const handleDelete = async (todoId: string) => {
    const confirmed = window.confirm(t("deleteQuestion"));

    if (!confirmed) {
      return;
    }

    try {
      await deleteTodo(todoId);
      fetchTodos();
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  const updateTodo = (todoId: string, data: any) => {
    setIsLoading(true);
    API.put(config.API.NAME, "/todos", { body: { todoId, data } });
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
      alert(error.message);
    }
    setIsLoading(false);
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
      alert(error.message);
    }
    setIsLoading(false);
  };

  const renderTodos = () => {
    return (
      <div className={classes.todos}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Summary data={todos} />

            <CustomTable
              data={todos}
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
                  to="/todos/new"
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
