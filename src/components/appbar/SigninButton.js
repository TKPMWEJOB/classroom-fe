import * as React from 'react';
import Button from '@mui/material/Button';

import SigninDialog from '../authentication/SigninDialog';
import SignupDialog from '../authentication/SignupDialog';

export default function SigninButton() {
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

  return (
    <div>
        <SigninDialog open={openSignin}
        handleClose={handleCloseSignin}
        handleCreateSignup={handleCreateSignup}
        dialogTitle="Sign In"
        />
        <SignupDialog open={openSignup}
        handleClose={handleCloseSignup}
        dialogTitle="Sign Up"
        />

        <Button color="inherit" onClick={handleCreateSignin}>Sign in</Button>
    </div>
  );
}
