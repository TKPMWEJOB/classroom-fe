import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';

export default function SigninDialog({ open, dialogTitle, handleClose, handleSubmit}) {
  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
      <form action="/" method="POST" onSubmit={(e) => handleClose}>

        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
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
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            <Typography 
              variant="body1"
              color="primary"
              role="button"
            >
              Forget Password?
            </Typography>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            fullWidth
            size="large"
            sx={{margin: 3}}
          >
            Sign up
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
