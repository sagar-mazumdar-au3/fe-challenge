import React , {useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch } from "react-redux";
import { sagaActions } from "./sagaAction";

export default function Progress() {
  const dispatch = useDispatch();

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ){
      // End of the document reached
      console.log("SCROLL ()");
      dispatch({ type: sagaActions.FETCH_REPO_DATA_SAGA });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}
