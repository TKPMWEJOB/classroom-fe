import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';

export default function SigninDialog({ open, dialogTitle, handleClose, handleCreateSignup}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        remember: e.target.remember.checked
      }),
      accept: '*/*',
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
          console.log(result);
          localStorage.setItem('token', JSON.stringify(result));
          window.location.reload();
          handleClose();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
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
        </DialogActions>
      </form>
    </Dialog>
  );
}
