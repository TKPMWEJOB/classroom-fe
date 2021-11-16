import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';

export default function SignupDialog({ open, dialogTitle, handleClose}) {
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = useState(true);
    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    function handleDisabled() {
        setDisabled(!disabled);
    }

    function handleClickLoading() {
        setLoading(true);
    }

    const handleCloseErrorSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnack(false);
    };

    const handleCloseSuccessSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessSnack(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClickLoading();
        if (e.target.password.value !== e.target.rePassword.value) {
            setOpenErrorSnack(true);
            setSnackMsg("Comfirm password does not match password.");
            setLoading(false);
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
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
                setSnackMsg(result.msg);
                setOpenSuccessSnack(true);
                setLoading(false);
                setTimeout(() => {  
                    console.log(result);
                    setLoading(false);
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
                    id="rePassword"
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
                <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{margin: 2}}                    
                    disabled={disabled}
                >
                    Sign up
                </LoadingButton>
                {/*}
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
                */}   
            </DialogActions>
            </form>
            <Snackbar open={openErrorSnack} autoHideDuration={6000} onClose={handleCloseErrorSnack}>
                <MuiAlert 
                    elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }} 
                > 
                   {snackMsg}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openSuccessSnack} autoHideDuration={6000} onClose={handleCloseSuccessSnack}>
                <MuiAlert 
                    elevation={6} variant="filled" onClose={handleCloseSuccessSnack} severity="success" sx={{ width: '100%' }} 
                > 
                    {snackMsg}
                </MuiAlert>
            </Snackbar>
        </Dialog>
    );
}
