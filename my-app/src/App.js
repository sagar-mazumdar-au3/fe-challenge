import React, { useEffect } from "react";
import RepoList from "./components/RepoList";
import { useDispatch } from "react-redux";
import { sagaActions } from "./redux/saga/sagaAction";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_REPO_DATA_SAGA });
  }, [dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box>
          <h1 align="center">-: Most Starred Repos :-</h1>
          <RepoList />
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default App;