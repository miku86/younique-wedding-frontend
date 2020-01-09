import { Box, Fab, Link, makeStyles, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import config from "../../config";
import { TisAuthenticated } from "../../utils/customTypes";
import CustomTable from "../shared/CustomTable";
import Landing from "../shared/Landing";

interface Props {
  isAuthenticated: TisAuthenticated;
}

const useStyles = makeStyles((theme: Theme) => ({
  todos: {
    padding: "80px 20px",
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

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const todos = await loadNotes();
        console.log(todos);
        setTodos(todos);
      } catch (error) {
        alert(error);
      }
    })();
  }, [isAuthenticated]);

  const loadNotes = () => {
    return API.get(config.API.NAME, "/todos", {});
  };

  const renderTodos = () => {
    return (
      <div className={classes.todos}>
        <h1>Your Todos</h1>
        {!isLoading && todos && <CustomTable data={todos} />}
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
      </div>
    );
  };

  return <div>{isAuthenticated ? renderTodos() : <Landing />}</div>;
};

export default Todos;
