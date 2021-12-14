import * as React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

import { UserContext } from '../../../contexts/UserContext';
import LoggedButtons from '../../appbar/LoggedButtons';
import SigninButton from '../../appbar/SigninButton';

import { isTeacher, isStudent, isOwner } from '../../../utils/Role';

export default function ButtonAppBar({ course, handleChangeTab, role }) {
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
        <Toolbar>
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

          <TabList onChange={handleChangeTab} aria-label="lab API tabs example" variant="scrollable"
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{
              '& .MuiTabs-flexContainer': {
                flexWrap: 'wrap',
              },
            }}
            style={{ margin: "auto" }}
          >
            <Tab label="Stream" value="1" style={{ textTransform: 'none' }} />
            <Tab label="Classwork" value="2" style={{ textTransform: 'none' }} />
            <Tab label="People" value="3" style={{ textTransform: 'none' }} />

            {isTeacher(role) ?
              <Tab label="Grade Structure" value="4" style={{ textTransform: 'none' }} />
              : ''
            }
            {isTeacher(role) ?
              <Tab label="Student Grades" value="5" style={{ textTransform: 'none' }} />
              : ''
            }
          </TabList>
          {userInfo.isLogin ? <LoggedButtons handleAvatarClick={handleGoUserProfile} /> : <SigninButton />}
          {/*token ?
            <>
              <Avatar alt={token.user?.email} src="./user.png" onClick={handleGoUserProfile}/>
              <Button color="inherit" onClick={handleSignout}>Sign out</Button> 
            </> :
            <Button color="inherit" onClick={handleCreateSignin}>Sign in</Button>
          */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
