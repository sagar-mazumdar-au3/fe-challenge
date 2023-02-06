import React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changeWeek } from '../redux/store';
import { sagaActions } from '../redux/saga/sagaAction';

const weekById = { 1: "oneWeek", 2: "twoWeeks", 3: "oneMonth" };

export default function Progress() {
  const dispatch = useDispatch();
  const selectedWeek = useSelector(state => state?.repo?.selectedWeek);
  const repos = useSelector(state => state?.repo);

  const buttonClickHandler = (e) => {
    if (selectedWeek !== Number(e?.target?.value)) {
      dispatch(changeWeek(Number(e?.target?.value)));
      if (!repos[[weekById[Number(e?.target?.value)]]]?.repos?.length) {
        dispatch({ type: sagaActions.FETCH_REPO_DATA_SAGA });
      }
    }
  }


  return (
    <Box align="center" sx={{ width: '100%' }}>
      <ButtonGroup variant="outlined" aria-label="outlined button group" onClick={(e) => { buttonClickHandler(e) }}>
        <Button variant={selectedWeek === 3 ? "contained" : "outlined"} value="3">Last One Month</Button>
        <Button variant={selectedWeek === 2 ? "contained" : "outlined"} value="2">Last Two Weeks</Button>
        <Button variant={selectedWeek === 1 ? "contained" : "outlined"} value="1">Last One Week</Button>
      </ButtonGroup>
    </Box>
  );
}
