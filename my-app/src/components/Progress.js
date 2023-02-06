import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch } from 'react-redux';
import { sagaActions } from '../redux/saga/sagaAction';

export default function Progress() {
  const dispatch = useDispatch();

  const handleScroll = useCallback(() => {
    if (
      window?.innerHeight + document?.documentElement?.scrollTop === document?.documentElement?.offsetHeight
    ) {
      // End of the document reached
      dispatch({ type: sagaActions.FETCH_REPO_DATA_SAGA });
    }
  }, [dispatch]);

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}
