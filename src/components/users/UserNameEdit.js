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

function UserNameEditForm({ setError, setIsLoaded, setUserInfo, userInfo }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/users/profile`, e)
      .then(() => {
        setIsLoaded(true);
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error);
    });
    setOpen(false);

    /*e.preventDefault();
    setOpen(false);
    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      method: 'PUT',
      accept: '*//**',
      body: JSON.stringify({
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        studentid: e.target.studentid.value
      }),
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
        const newUser = userInfo.map((item) => {
          if (parseInt(item.id) === parseInt(result.id)) {
            item = result;
          }
          return item;
        }); 
        setIsLoaded(true);
        setUserInfo(newUser);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );*/
  }

  const initialValues = {
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    studentid: userInfo.studentid
  }
    
  const validationSchema = Yup.object().shape({
    studentid: Yup.string().min(3, "It's too short")
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
                      id="firstname"
                      name="firstname"
                      fullWidth
                      label="First Name"
                      autoComplete="firstname"
                      helperText={<ErrorMessage name='firstname' />}
                      />
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: 10 }}>
                      <Field as={TextField}
                      required
                      id="lastname"
                      name="lastname"
                      fullWidth
                      label="Last Name"
                      autoComplete="lastname"
                      helperText={<ErrorMessage name='lastname' />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Field as={TextField}
                      id="studentid"
                      name="studentid"
                      fullWidth
                      error={props.errors.studentid && props.touched.studentid}
                      label="Student Id"
                      autoComplete="12345"
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