import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { config } from "../../config";
import { TisAuthenticated } from "../../utils/customTypes";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";
import Summary from "./Summary";
import CustomTable from "./Table";

interface Props {
  isAuthenticated: TisAuthenticated;
}

const useStyles = makeStyles((theme: Theme) => ({
  todos: {
    padding: "0px 20px",
    textAlign: "center",

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
    setIsLoading(false);
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
    })();
  }, [isAuthenticated]);

  const deleteTodo = async (todoId: string) => {
    const body = {
      todoId
    };

    setIsLoading(true);
    await API.del(config.API.NAME, "/todos", { body });
    setIsLoading(false);
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
  };

  const updateTodo = (
    todoId: string,
    fieldKey: string,
    newFieldValue: boolean
  ) => {
    const body = {
      todoId,
      fieldKey,
      newFieldValue
    };

    return API.put(config.API.NAME, "/todos", { body });
  };

  const handleUpdate = async (
    todoId: string,
    fieldKey: string,
    fieldValue: boolean
  ) => {
    const newFieldValue = !fieldValue;

    setIsLoading(true);

    try {
      await updateTodo(todoId, fieldKey, newFieldValue);
      fetchTodos();
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
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
              handleUpdate={handleUpdate}
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
