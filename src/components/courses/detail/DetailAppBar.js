import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';

import SigninDialog from '../../authentication/SigninDialog'
import SignupDialog from '../../authentication/SignupDialog';

export default function ButtonAppBar({course, handleChangeTab }) {
  const [openSignin, setOpenSignin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  const handleCreateSignin = () => {
    setOpenSignin(true);
    setOpenSignup(false);
  };

  const handleCloseSignin = () => {
    setOpenSignin(false);
  };

  const handleCreateSignup = () => {
    setOpenSignup(true);
    setOpenSignin(false);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SigninDialog open={openSignin}
        handleClose={handleCloseSignin}
        handleCreateSignup={handleCreateSignup}
        dialogTitle="Sign In"
      />
      <SignupDialog open={openSignup}
        handleClose={handleCloseSignup}
        dialogTitle="Sign Up"
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
            <Tab label="Grades" value="4" style={{ textTransform: 'none' }} />
          </TabList>
          {token ?
            <>
              <Avatar alt={token.user?.email} src="./user.png" />
              <Button color="inherit" onClick={handleSignout}>Sign out</Button>
            </> :
            <Button color="inherit" onClick={handleCreateSignin}>Sign in</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
