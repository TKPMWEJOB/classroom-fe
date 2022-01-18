import React from 'react';
import { useState } from 'react';
import '../../assets/css/style.css';

import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Button
} from '@material-ui/core';

import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Item = styled('div')({
  padding: 20,
  display: 'block',
});

function UserNameEditForm({ setIsLoaded, setUser, user }) {
  const [loading, setLoading] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  
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
    const config = {
      headers: { 'authorization': `${tokenLocal}` }
    };
    axios.put(`${process.env.REACT_APP_API_URL}/user/nameid`, e, config)
    .then(res => {
      setSnackMsg(res.data.msg);
      if(parseInt(user.id) === parseInt(res.data.id)) {          
        setUser(res.data);
      }      
      setOpenSuccessSnack(true);
      setLoading(false);
      setIsLoaded(true);
    })
    .catch( 
      error => {
        setIsLoaded(true);
        setSnackMsg(error.response.data.msg);
        setOpenErrorSnack(true);
        setLoading(false);
      }      
    );
    setOpen(false);
  }

  const initialValues = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    studentID: user.studentID,
    isMapping: user.isMapping,
  }
    
  const validationSchema = Yup.object().shape({
    studentID: Yup.string().min(3, "It's too short")
  });


  return (
    <>
      <Grid item xs={1} md={3}>
        <Item>
          <div className='text-right'>
            <Button
            className="m-2"
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}>
            Edit
            </Button>
          </div>
        </Item>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {(props) => (
              <Form noValidate>
                  <Grid container spacing={3} direction="row"> 
                  <Grid item xs={6} style={{ marginTop: 10 }}>
                      <Field as={TextField}
                      required
                      id="firstName"
                      name="firstName"
                      fullWidth
                      label="First Name"
                      autoComplete="firstname"
                      helperText={<ErrorMessage name='firstname' />}
                      />
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: 10 }}>
                      <Field as={TextField}
                      required
                      id="lastName"
                      name="lastName"
                      fullWidth
                      label="Last Name"
                      autoComplete="lastname"
                      helperText={<ErrorMessage name='lastname' />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Field as={TextField}
                      id="studentID"
                      name="studentID"
                      fullWidth
                      error={props.errors.studentID && props.touched.studentID}
                      label="Student ID"
                      autoComplete="studentid"
                      helperText={<ErrorMessage name='studentid' />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <Switch
                      name="isMapping"
                      value="Y"
                      checked={props.values.isMapping}
                      onChange={(event, checked) => {
                        props.setFieldValue("isMapping", checked);
                      }}
                    />
                    <p>{props.values.isMapping ? "Mapping ID" : "Unmapping ID"}</p>
                  </Grid>
                  </Grid>

                  <DialogActions>
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
  
export default UserNameEditForm;