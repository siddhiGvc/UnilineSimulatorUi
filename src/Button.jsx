import React from 'react';
import { Switch, FormControlLabel, Typography, Stack ,Grid} from '@mui/material';

const SwitchButton = ({ name, value, onChange, label, OnLabel, Offlable, isChecked, setIsChecked }) => {
  const handleSwitchChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);  // Update the parent component's state
    onChange(event);        // Call parent's onChange handler
  };

  return (
    <>
    <Grid sx={{display:'flex',justifyContent:'space-between'}}>
    <Typography variant='h6'>
         {label}
    </Typography>
    <FormControlLabel
      control={
        <Switch
          checked={isChecked}
          onChange={handleSwitchChange}
          name={name}
          color="primary"
        />
      }
      label={isChecked ? OnLabel : Offlable}
    />
    </Grid>
    </>
  );
};

export default SwitchButton;

