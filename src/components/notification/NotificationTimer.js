import * as React from 'react';
import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export default function NotificationTimer({createdTime}) {
  let timeString = 'seconds ago';
  let currentDate = Date.now();
  let pastDate = new Date(createdTime);
  let timer = (currentDate.valueOf() - pastDate.valueOf()) / 1000;
  
  // month
  if (timer > 60 * 60 * 24 * 30) {
    timer = timer / (60 * 60 * 24 * 30);
    if (timer === 1) {
      timeString = 'month ago';
    }
    else {
      timeString = 'months ago';
    }
  }
  // day
  else if (timer > 60 * 60 * 24) {
    timer = timer / (60 * 60 * 24);
    if (timer === 1) {
      timeString = 'day ago';
    }
    else {
      timeString = 'days ago';
    }
  }
  // hour
  else if (timer > 60 * 60) {
    timer = timer / (60 * 60);
    if (timer === 1) {
      timeString = 'hour ago';
    }
    else {
      timeString = 'hours ago';
    }
  }
  // minute
  else if (timer > 60) {
    timer = timer / (60);
    if (timer === 1) {
      timeString = 'minute ago';
    }
    else {
      timeString = 'minutes ago';
    }
  }

  
  return (
    <Typography
      variant='body2'
      align='right'
      sx={{ fontWeight: 'regular', fontSize: '12px', color: '#aaaaaa' }}
    >
      {`${Math.floor(timer)} ${timeString}`}
    </Typography>
  );
}