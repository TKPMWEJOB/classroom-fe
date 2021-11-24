import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import SigninGoogleButton from './SigninGoogleButton';

axios.defaults.withCredentials = true;
export default function SigninDialog({ open, dialogTitle, handleClose, handleCreateSignup}) {
  const [loading, setLoading] = React.useState(false);
  const { updateUser } = useContext(UserContext);
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  function handleClickLoading() {
    setLoading(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClickLoading();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        email: e.target.email.value,
        password: e.target.password.value,
        remember: e.target.remember.checked
      });
      console.log(response);
      handleSetMsgSnack(response.data.msg);
      handleOpenSuccessSnack(true);
      setLoading(false);
      
      setTimeout(() => {
        handleClose();
        updateUser(true, response.data.body);
      }, 1500);
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

          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            inputProps={{ maxLength: 50 }}
          />
          <Grid 
            container 
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox id="remember" color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            <Typography 
              variant="body1"
              color="primary"
              role="button"
              sx={{cursor: "pointer"}}
            >
              Forget Password?
            </Typography>
          </Grid>
          <Typography 
            variant="body1"
            color="primary"
            role="button"
            align="center"
            sx={{cursor: "pointer"}}
            onClick={handleCreateSignup}
          >
            No account? Sign up here.
          </Typography>
          
          <SigninGoogleButton 
            handleSetMsgSnack={handleSetMsgSnack} 
            handleOpenSuccessSnack={handleOpenSuccessSnack} 
            handleOpenErrorSnack={handleOpenErrorSnack}
            handleClose={handleClose}
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
            Sign in
          </LoadingButton>
          {/*
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{margin: 3}}
            
          >
            Sign in
          </Button>
          */}
        </DialogActions>
      </form>
    </Dialog>
  );
}

/*
    fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        remember: e.target.remember.checked
      }),
      accept: '/*',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        return res.text().then(text => { throw new Error(text) })
      }
    })
      .then(
        (result) => {
          setSnackMsg(result.msg);
          setOpenSuccessSnack(true);
          setLoading(false);
          setTimeout(() => {  
            console.log(result);
            setCookie("token", result.jwtToken, {maxAge: result.maxAge});
            //window.location.reload();
            localStorage.setItem('token', JSON.stringify({
              user: result.body,
              jwtToken: result.jwtToken
            }));
            handleClose();
          }, 2000);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          setSnackMsg(JSON.parse(error.message).msg);
          setOpenErrorSnack(true);
          setLoading(false);
        }
      );
      */