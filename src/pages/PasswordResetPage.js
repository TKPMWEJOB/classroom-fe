import { useState, useEffect, useContext } from 'react';
import { Redirect, useParams, useHistory } from "react-router-dom"
import { Formik, ErrorMessage, Field, Form } from "formik"
import * as Yup from "yup"
import AppBar from '../components/appbar/AppBar'
import { SnackbarContext } from '../contexts/SnackbarContext';
import axios from 'axios';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';

export default function PasswordResetPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const formik = {
    initialValues: {
      password: "",
      rePassword: "",
    }, 
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!")
    })
  };
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);
	const { token } = useParams();

  useEffect(async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/reset/${token}`);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      await setError(err.response);
      console.log(error)
      history.push('/');
    }
  }, []);

  const handleSubmit = async (values) => {
    //e.preventDefault();
    setLoading(true);

    try {
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset/${token}`, {
          password: values.password,
      });
      console.log(res);
      handleSetMsgSnack(res.data.msg);
      handleOpenSuccessSnack(true);
      setLoading(false);
      setTimeout(() => {
        history.push('/');
      }, 1500);
    } catch(error) {
      const { response } = error;
      console.error(error);
      handleSetMsgSnack(response.data.msg);
      handleOpenErrorSnack(true);
      setLoading(false);
    }
  }

  return (
    <>
    {
      error ? (error ? <h1>Error: {error.data.msg}</h1> : "Error!") :
      <div>
          <AppBar></AppBar>
            <Box style={styles.flexStyle}>
              <h2>Password reset</h2>
              <Formik
                initialValues={formik.initialValues}
                validationSchema={formik.validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                { props => (
                  <Form style={styles.flexStyle}>
                    <Field
                      required
                      autoComplete="off"
                      as={TextField}
                      label="New Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      error={Boolean(props.errors.password)}
                      helperText={<ErrorMessage name="password" />}
                    />
                    <Field
                      required
                      autoComplete="off"
                      as={TextField}
                      label="Comfirm New Password"
                      name="rePassword"
                      type="password"
                      variant="outlined"
                      error={Boolean(props.errors.rePassword)}
                      helperText={<ErrorMessage name="rePassword" />}
                    />
                    <LoadingButton
                      loading={loading}
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{margin: 2}}
                    >
                      Reset Password
                    </LoadingButton>
                  </Form>
                )}
              </Formik>
            </Box>
        </div>
    }
    </>
  );
}

const styles = {
  flexStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}