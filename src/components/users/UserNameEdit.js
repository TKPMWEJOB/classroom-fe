import React from 'react';
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

import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Item = styled('div')({
  padding: 20,
  display: 'block',
});

function UserNameEditForm({ setError, setIsLoaded, setUser, user }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/user/nameid`, e)
    .then(res => {
      if(parseInt(user.id) === parseInt(res.data.id)) {          
        setUser(res.data);
      }
      setIsLoaded(true);
    })
    .catch( 
      error => {
        setIsLoaded(true);
        setError(error);
      }      
    );
    setOpen(false);
  }

  const initialValues = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    studentID: user.studentID
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
  
export default UserNameEditForm;