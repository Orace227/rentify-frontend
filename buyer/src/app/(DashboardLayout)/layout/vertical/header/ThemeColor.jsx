import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setDarkMode } from '@/store/customizer/CustomizerSlice';

const ThemeColor = () => {
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);

  const [themeMode, setThemeMode] = useState(customizer.activeMode || 'light');

  const handleThemeToggle = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    dispatch(setDarkMode(newThemeMode)); // Assuming you have this action in your slice
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={themeMode === 'dark'}
          onChange={handleThemeToggle}
          name="themeMode"
          color="primary"
        />
      }
      label={`dark`}
    />
  );
};

export default ThemeColor;
