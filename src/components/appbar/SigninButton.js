import * as React from 'react';
import Button from '@mui/material/Button';

import SigninDialog from '../authentication/SigninDialog';
import SignupDialog from '../authentication/SignupDialog';
import ForgetPasswordDialog from '../authentication/ForgetPasswordDialog';

export default function SigninButton() {
  const [openSignin, setOpenSignin] = React.useState(false);
  const [openForget, setOpenForget] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  const handleCreateSignin = () => {
    setOpenForget(false);
    setOpenSignin(true);
    setOpenSignup(false);
  };

  const handleCloseSignin = () => {
    setOpenSignin(false);
  };

  const handleCreateForget = () => {
    setOpenForget(true);
    setOpenSignin(false);
    setOpenSignup(false);
  };

  const handleCloseForget = () => {
    setOpenForget(false);
  };

  const handleCreateSignup = () => {
    setOpenForget(false);
    setOpenSignin(false);
    setOpenSignup(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  return (
    <div>
        <SigninDialog 
          open={openSignin}
          handleClose={handleCloseSignin}
          handleCreateSignup={handleCreateSignup}
          handleCreateForget={handleCreateForget}
          dialogTitle="Sign In"
        />
        <SignupDialog 
          open={openSignup}
          handleClose={handleCloseSignup}
          dialogTitle="Sign Up"
        />
        <ForgetPasswordDialog 
          open={openForget}
          handleClose={handleCloseForget}
          dialogTitle="Reset your Password"
        />
        <Button color="inherit" onClick={handleCreateSignin}>Sign in</Button>
    </div>
  );
}
