import React from 'react';
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

function UserInfoEdit({ setError, setIsLoaded, setUserInfo, userInfo }) {
  const [open, setOpen] = React.useState(false);

  const phoneRegExp=/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;


  const initialValues = {
    date: userInfo.UserInfo.birthday,
    gender: userInfo.UserInfo.gender,
    address: userInfo.UserInfo.address,
    phone: userInfo.UserInfo.phone,
    school: userInfo.UserInfo.school
  }
    
  const validationSchema = Yup.object().shape({
    phone:Yup.string().matches(phoneRegExp,"Enter valid Phone number"),
    birthday: Yup.date()
  });  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/user/info/${userInfo.id}`, e)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        return res.text().then(text => { throw new Error(text) })
      }
    })
    .then(
      (result) => {
        if(parseInt(userInfo.id) === parseInt(result.id)) {
          setUserInfo(result);
        }
        setIsLoaded(true);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
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
                <Button type="submit" color="primary">
                    Save
                </Button>
                </DialogActions>
              </Form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
  
export default UserInfoEdit;