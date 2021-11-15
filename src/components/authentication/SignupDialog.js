import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';

export default function SignupDialog({ open, dialogTitle, handleClose}) {
    const [disabled, setDisabled] = useState(true);

    function handleDisabled() {
        setDisabled(!disabled);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
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
            <DialogContent>

                <Grid 
                    container 
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 50}}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 50}}
                    />
                </Grid>

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
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 50 }}
                />

                <TextField
                    required
                    margin="normal"
                    id="password"
                    label="Comfirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 50 }}
                />
                
                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label={<Typography variant="body1">I accept the terms and conditions, as well as the privacy policy</Typography>}
                    onChange={handleDisabled}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    type="submit"
                    fullWidth
                    color="primary"
                    size="large"
                    sx={{margin: 2}}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{margin: 2}}
                    disabled={disabled}
                >
                Sign up
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    );
}
