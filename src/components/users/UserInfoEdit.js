import React from 'react';
import { useState } from 'react';
import '../../assets/css/style.css';

import {
  Grid,
  TextField,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  Button
} from '@material-ui/core';

import FormikRadioGroup from "./FormikRadioGroup";
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Item = styled('div')({
  padding: 20,
  display: 'block',
});

const RadioOptions=['Male', 'Female', 'Other']

function UserInfoEdit({ setIsLoaded, setUser, user }) {
  const [loading, setLoading] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [open, setOpen] = React.useState(false);

  const phoneRegExp=/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;


  const initialValues = {
    id: user.id,
    date: user.birthday,
    gender: user.gender,
    address: user.address,
    phone: user.phone,
    school: user.school
  }
    
  const validationSchema = Yup.object().shape({
    phone:Yup.string().matches(phoneRegExp,"Enter valid Phone number"),
    birthday: Yup.date()
  });  

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
    axios.put(`${process.env.REACT_APP_API_URL}/user/info`, e)
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
                <Grid container spacing={3}> 
                  <Grid item xs={12} style={{ marginTop: 10 }}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <DesktopDatePicker
                        id="birthday"
                        name="birthday"
                        label="Birthday"
                        inputFormat="dd/MM/yyyy"
                        value={props.values.date}
                        onChange={value => props.setFieldValue("date", value)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: -10 }}>
                    <Field
                      row 
                      label="Gender"
                      name="gender"
                      options={RadioOptions}
                      component={FormikRadioGroup}
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <Field as={TextField}
                      id="address"
                      name="address"
                      fullWidth
                      label="Address"
                      autoComplete="address"
                      helperText={<ErrorMessage name='address' />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Field as={TextField}
                      id="phone"
                      name="phone"
                      fullWidth
                      error={props.errors.phone && props.touched.phone}
                      label="Phone Number"
                      autoComplete="phoneNumber"
                      helperText={<ErrorMessage name='phoneNumber' />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Field as={TextField}
                      id="school"
                      name="school"
                      fullWidth
                      label="School"
                      autoComplete="school"
                      helperText={<ErrorMessage name='school' />}
                      />
                  </Grid>
                </Grid>

                <DialogActions>
                  <Button onClick={handleClose} color="primary">
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
  
export default UserInfoEdit;