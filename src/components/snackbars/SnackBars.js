import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function SnackBars({ openErrorSnack, openSuccessSnack, SnackMsg, setOpenSuccessSnack, setOpenErrorSnack }) {

  const handleCloseErrorSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenErrorSnack(false);
  };

  const handleCloseSuccessSnack = (event, reason) => {
    setOpenSuccessSnack(false);
  };

  return (
    <div>
        <Snackbar open={openErrorSnack} autoHideDuration={4000} onClose={handleCloseErrorSnack}>
            <MuiAlert 
                elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }} 
            > 
                {SnackMsg}
            </MuiAlert>
        </Snackbar>
        <Snackbar open={openSuccessSnack} autoHideDuration={4000} onClose={handleCloseSuccessSnack}>
            <MuiAlert 
                elevation={6} variant="filled" onClose={handleCloseSuccessSnack} severity="success" sx={{ width: '100%' }} 
            > 
                {SnackMsg}
            </MuiAlert>
        </Snackbar>
    </div>
  );
}
