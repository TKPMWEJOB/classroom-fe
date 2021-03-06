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
import NotificationTimer from './NotificationTimer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxHeight: 400,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notification, setNotification] = useState(null);
  const [numberOfNotification, setNumberOfNotification] = useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState(false);
  const [dialogTime, setDialogTime] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/notification/all`);
      // if (res.status === 200) {
      //console.log(res.data);
      if (res.data) {
        setNotification(res.data);
        const newArray = res.data.filter(function (e) {
          return e.status === 'waiting';
        });
        setNumberOfNotification(newArray.length);
      }
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setError(err);
    }
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = async(e) => {
    const data = {
      notificationId: e.currentTarget.value
    }

    const notificationContent = notification.filter(obj => {
      return obj.id === data.notificationId
    });

    setDialogTitle(notificationContent[0].title);
    setDialogContent(notificationContent[0].content);
    setDialogTime(notificationContent[0].createdAt);

    handleClickOpenDialog();

    if (notificationContent[0].status !== 'viewed') {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/notification/update-viewed-status`, { data: data });
        if (res.data) {
          setNotification(res.data);
          const newArray = res.data.filter(function (e) {
            return e.status === 'waiting';
          });
          setNumberOfNotification(newArray.length);
        }
      } catch (err) {
          console.log(err.response.data.message);
      }
    }
    setAnchorEl(null);
  }

  return (
    <div>
      <Tooltip title="Notification" arrow>
        <IconButton 
          id="notification-button"
          aria-controls={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          size="large" 
          edge="start" 
          color="inherit" 
          aria-label="menu"
          disableElevation
          onClick={handleClick}
          sx={{ mr: 2 }}>
            { numberOfNotification > 0 ? 
            <Badge badgeContent={numberOfNotification} color="error"> 
              <NotificationsIcon />
            </Badge>
            : <NotificationsIcon />}
        </IconButton>
      </Tooltip>
      
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        { notification ? notification.map((item, index) => (
          <MenuItem key={`notification${index}`} value={`${item.id}`} onClick={handleClickItem} disableRipple>
          <Box sx={{width: 300, textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {item.status === 'waiting' ? 
            <>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'medium', color: '#2196f3', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'regular', textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {item.content}
              </Typography>
            </> 
            : <><Typography
                variant="body2"
                sx={{ fontWeight: 'medium', color: '#aaaaaa', textOverflow: 'ellipsis', overflow: 'hidden'}}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'regular', color: '#aaaaaa', textOverflow: 'ellipsis', overflow: 'hidden'}}
              >
                {item.content}
              </Typography>
            </>}
            <NotificationTimer createdTime={item.createdAt}></NotificationTimer>
          </Box>
        </MenuItem>
          
        )) : 'No message'}
      </StyledMenu>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="notification-dialog-title"
        aria-describedby="notification-dialog-description"
      >
        <DialogTitle id="notification-title">
          <Typography
            variant="h6"
            sx={{ fontWeight: 'medium', color: '#2196f3' }}
          >
            {dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="notification-content" sx={{mb: 2}}>
            {dialogContent}
          </DialogContentText>
          <NotificationTimer createdTime={dialogTime}></NotificationTimer>
        </DialogContent>
      </Dialog>
    </div>
  );
}