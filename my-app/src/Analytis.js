import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

const menuItemLabel = { 1: "Commits", 2: "Additions", 3: "Deletions" };

export default function Analytics() {
  const [menu, setMenu] = React.useState(1);

  const handleChange = (event) => {
    setMenu(event.target.value);
  };

  return (
    <Box m={3}>
      <Stack direction="row" justifyContent="end" >
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select
            value={menu}
            onChange={handleChange}
          >
            <MenuItem value={1}>Commits</MenuItem>
            <MenuItem value={2}>Additions</MenuItem>
            <MenuItem value={3}>Deletions</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <h3 align="center">Total Changes</h3>
      <Typography align="center">{`Changes for "${menuItemLabel[menu]}" goes here...`}</Typography>
      <h3 align="center">Contributor Changes</h3>
      <Typography align="center">{`Changes for "${menuItemLabel[menu]}" goes here...`}</Typography>
    </Box>
  );
}