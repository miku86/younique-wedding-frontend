import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import config from "../../config";
import { TisAuthenticated } from "../../utils/customTypes";
import CustomTable from "../shared/CustomTable";
import Landing from "../shared/Landing";
import LoadingSpinner from "../shared/LoadingSpinner";

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

  const fetchTodos = async () => {
    setIsLoading(true);
    const todos = await API.get(config.API.NAME, "/todos", {});
    setTodos(todos);
    setIsLoading(false);
  };

  const deleteTodo = async (todoId: string) => {
    const body = {
      todoId
    };

    setIsLoading(true);
    await API.del(config.API.NAME, "/todos", { body });
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

  const handleDelete = async (
    todoId: any
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

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

  const renderTodos = () => {
    return (
      <div className={classes.todos}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1>Your Todos</h1>
            <CustomTable
              data={todos}
              showDeleteButton={true}
              handleDelete={handleDelete}
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
