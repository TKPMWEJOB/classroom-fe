import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Home';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

import { UserContext } from '../../../../contexts/UserContext';
import LoggedButtons from '../../../appbar/LoggedButtons';
import SigninButton from '../../../appbar/SigninButton';

import { isTeacher, isStudent, isOwner } from '../../../../utils/Role';
import NotificationButtonMenu from '../../../notification/NotificationButton';

export default function ButtonAppBar({ course, role, gradeInfor }) {
  const { userInfo } = useContext(UserContext);
  const history = useHistory();

  const handleGoUserProfile = () => {
    const href = '/user';
    history.push(href);
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white", borderBottom: "1px solid #e0e0e0", boxShadow: 'none', color: "#3c4043" }}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
              href="/"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {course.name}
            </Typography>
          </Stack>
          

          <Stack direction="row" justifyContent="center" alignItems="center">
            {userInfo.isLogin ? 
              <NotificationButtonMenu />
              : ""
            }
            {userInfo.isLogin ? <LoggedButtons handleAvatarClick={handleGoUserProfile} /> : <SigninButton />}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
