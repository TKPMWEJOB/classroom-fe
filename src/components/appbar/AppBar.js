import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';

import CreateCourseDialog from '../courses/CreateCourseDialog';
import SigninButton from './SigninButton';
import LoggedButtons from './LoggedButtons';

export default function ButtonAppBar() {
  const [openCreateCourse, setOpenCreateCourse] = React.useState(false);
  const { userInfo } = useContext(UserContext);

  const handleCreateCourse = () => {
    setOpenCreateCourse(true);
  };

  const history = useHistory();

  const handleGoUserProfile = () => {
    const href = '/user';
    history.push(href);
    window.location.reload();
  }

  const handleGoHome = () => {
    const href = '/';
    history.push(href);
    window.location.reload();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CreateCourseDialog
        open={openCreateCourse}
        setOpen={setOpenCreateCourse}
      />

      <AppBar position="static" style={{ background: "white", borderBottom: "1px solid #e0e0e0", boxShadow: 'none', color: "#3c4043" }}>
        <Toolbar>
          <IconButton
            href='/'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleGoHome} >
              Moorssalc Elgoog Classroom
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ flexGrow: 1}}>
            
          </Typography>

          {userInfo.isLogin ? 
            <>
              <Tooltip title="Notification" arrow>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                  sx={{ mr: 2 }}>
                    <Badge badgeContent={4} color="error"> 
                      <NotificationsIcon />
                    </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Create Class" arrow>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleCreateCourse}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
            : ""
          }

          {userInfo.isLogin ? <LoggedButtons handleAvatarClick={handleGoUserProfile} /> : <SigninButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
