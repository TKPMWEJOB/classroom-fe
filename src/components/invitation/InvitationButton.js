import React from 'react';
import { useState } from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function UserNameEditForm({ course }) {
  const [loading, setLoading] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    handleClickLoading();
    axios.put(`${process.env.REACT_APP_API_URL}/send-invitation`, e)
    .then(res => {
      setSnackMsg(res.data.msg);  
      setOpenSuccessSnack(true);
      setLoading(false);
    })
    .catch( 
      error => {
        setSnackMsg(error.response.data.msg);
        setOpenErrorSnack(true);
        setLoading(false);
      }      
    );
    setOpen(false);
  }
  
  const initialValues = {
    sender: course.User ? `${course.User.firstName} ${course.User.lastName}` : "Anonymous",
    invitationId: course.invitationId,
    email: ''
  }
    
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });


  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        style={{
          marginTop: 20, height: '20%', 
          width: '196px',
          fontSize: "18px"}}
        >
        Invite
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle>Invite Member</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {(props) => (
              <Form noValidate>
                  <Field as={TextField}
                      id="email"
                      name="email"
                      fullWidth
                      error={props.errors.email && props.touched.email}
                      label="Email"
                      autoComplete="email"
                      helperText={<ErrorMessage name='email' />}
                      style={{ width: '300px' }}
                    />

                  <DialogActions style={{ marginTop: 30 }}>
                  <Button onClick={handleClose} color="primary" sx={{margin: 2}}>
                      Cancel
                  </Button>

                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </LoadingButton>

                  </DialogActions>
              </Form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Snackbar open={openErrorSnack} autoHideDuration={4000} onClose={handleCloseErrorSnack}>
          <MuiAlert 
              elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }} 
          > 
              {snackMsg}
          </MuiAlert>
      </Snackbar>
      <Snackbar open={openSuccessSnack} autoHideDuration={4000} onClose={handleCloseSuccessSnack}>
          <MuiAlert 
              elevation={6} variant="filled" onClose={handleCloseSuccessSnack} severity="success" sx={{ width: '100%' }} 
          > 
              {snackMsg}
          </MuiAlert>
      </Snackbar>
    </>
  );
}
