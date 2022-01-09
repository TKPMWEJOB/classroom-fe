import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';

axios.defaults.withCredentials = true;
export default function ForgetPasswordDialog({ open, dialogTitle, handleClose}) {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset`, {
        email: e.target.email.value,
      });
      console.log(response);
      handleSetMsgSnack(response.data.msg);
      handleOpenSuccessSnack(true);
      setLoading(false);
    } catch (error) {
      const { response } = error;
      console.error(error);
      handleSetMsgSnack(response.data.msg);
      handleOpenErrorSnack(true);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
      <form action="/" method="POST" onSubmit={(e) => handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent
          sx={{paddingBottom: 0}}
        >
          <p>Enter your email and we will send you a reset password link.</p>
          <TextField
            autoFocus
            required
            margin="normal"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            inputProps={{ maxLength: 50 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            fullWidth
            size="large"
            sx={{margin: 3}}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{margin: 3}}
          >
            Send
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}