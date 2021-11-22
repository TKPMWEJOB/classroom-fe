import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

import CreateCourseDialog from '../courses/CreateCourseDialog';
import SigninButton from './SigninButton';
import LoggedButtons from './LoggedButtons';

export default function ButtonAppBar() {
  const [openCreateCourse, setOpenCreateCourse] = React.useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);

  const handleCreateCourse = () => {
    setOpenCreateCourse(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CreateCourseDialog
        open={openCreateCourse}
        setOpen={setOpenCreateCourse}
      />

      <AppBar position="static" style={{ background: "white", borderBottom: "1px solid #e0e0e0", boxShadow: 'none', color: "#3c4043" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Class Room
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleCreateCourse}
          >
            <AddIcon />
          </IconButton>
          { userInfo.isLogin ? <LoggedButtons /> : <SigninButton /> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
