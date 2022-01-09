import * as React from 'react';
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import axios from 'axios';

export default function ActivateAccountDialog({ open, email, handleClose, handleCloseSignup}) {
    const [loading, setLoading] = useState(false);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const handleClick = async () => {
        setLoading(true);
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/email-resend`, {
                email,
            });
            console.log(res);
            handleSetMsgSnack(res.data.msg);
            handleOpenSuccessSnack(true);
            setLoading(false);
        } catch(error) {
            const { response } = error;
            console.error(error);
            handleSetMsgSnack(response.data.msg);
            handleOpenErrorSnack(true);
            setLoading(false);
        }
    }

    const handleDone = () => {
        handleCloseSignup();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Account Activate</DialogTitle>
            <DialogContent>
                <Grid 
                    container 
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <h5>An email has been sent to {email} please check your email.</h5>
                    <Button
                        variant='text'
                        onClick={handleClick}
                    >
                        Resend
                    </Button>
                </Grid>

            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{margin: 2}}
                    onClick={handleDone}
                >
                    Done
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}