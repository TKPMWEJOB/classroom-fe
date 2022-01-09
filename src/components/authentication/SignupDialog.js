import * as React from 'react';
import { useState, useContext } from 'react';
import * as Yup from "yup"
import { Formik, ErrorMessage, Field, Form } from "formik"
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, Checkbox, Typography, Grid} from '@mui/material';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import axios from 'axios';
import ActivateAccountDialog from './ActivateAccountDialog';

export default function SignupDialog({ open, dialogTitle, handleClose}) {
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [openActivate, setOpenActivate] = React.useState(false);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    function handleDisabled() {
        setDisabled(!disabled);
    }

    const handleCreateActivate = () => {
        setOpenActivate(true);
      };
    
    const handleCloseActivate = () => {
        setOpenActivate(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (e.target.password.value !== e.target.rePassword.value) {
            handleOpenErrorSnack(true);
            handleSetMsgSnack("Comfirm password does not match password.");
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
            });
            console.log(res);
            setEmail(e.target.email.value);
            handleSetMsgSnack(res.data.msg);
            handleOpenSuccessSnack(true);
            setLoading(false);
            setTimeout(() => {  
                console.log(res);
                setLoading(false);
                handleCreateActivate();
            }, 1500);
        } catch(error) {
            const { response } = error;
            console.log(error);
            handleSetMsgSnack(response.data.msg);
            handleOpenErrorSnack(true);
            setLoading(false);
        }

    }

    const formik = {
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            rePassword: "",
            checkbox: "",
        }, 
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("Required!"),
            lastName: Yup.string().required("Required!"),
            username: Yup.string().required("Required!").test(
                'username',
                'Username has been taken!',
                async (value, context) => {
                    try {
                        await axios.post(`${process.env.REACT_APP_API_URL}/auth/check-info`, {
                            username: value,
                        });
                        return true;
                    } catch(err) {
                        return false;
                    }
                }
            ),
            email: Yup.string().email("Not valid email address!")
                .required("Required!").test(
                    'email',
                    'Email has been taken!',
                    async (value, context) => {
                        try {
                            await axios.post(`${process.env.REACT_APP_API_URL}/auth/check-info`, {
                                email: value,
                            });
                            return true;
                        } catch(err) {
                            return false;
                        }
                    }
                ),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            rePassword: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!"),
            checkbox: Yup.boolean().required("Required!"),
        })
    };

    return (
        <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
            <Formik
                initialValues={formik.initialValues}
                validationSchema={formik.validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
            >
                {props => (
                    <form action="/" method="POST" onSubmit={(e) => handleClose}>

                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogContent>

                            <Grid 
                                container 
                                flexWrap="nowrap"
                                justifyContent="space-between"
                                alignItems="center"

                                >
                                <Field
                                    required
                                    margin="normal"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{ maxLength: 50}}
                                    as={TextField}
                                    error={props.touched.firstName && Boolean(props.errors.firstName)}
                                    helperText={<ErrorMessage name="firstName" />}
                                />

                                <Field
                                    required
                                    margin="normal"
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{ maxLength: 50}}
                                    as={TextField}
                                    error={props.touched.lastName && Boolean(props.errors.lastName)}
                                    helperText={<ErrorMessage name="lastName" />}
                                />
                            </Grid>

                            <Field
                                required
                                margin="normal"
                                id="username"
                                name="username"
                                label="Username"
                                type="username"
                                fullWidth
                                variant="outlined"
                                inputProps={{ maxLength: 50 }}
                                as={TextField}
                                error={props.touched.username && Boolean(props.errors.username)}
                                helperText={<ErrorMessage name="username" />}
                            />

                            <Field
                                required
                                margin="normal"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                inputProps={{ maxLength: 50 }}
                                as={TextField}
                                error={props.touched.email && Boolean(props.errors.email)}
                                helperText={<ErrorMessage name="email" />}
                            />

                            <Field
                                required
                                fullWidth
                                margin="normal"
                                autoComplete="off"
                                as={TextField}
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                error={props.touched.password && Boolean(props.errors.password)}
                                helperText={<ErrorMessage name="password" />}
                            />
                            <Field
                                required
                                fullWidth
                                margin="normal"
                                autoComplete="off"
                                as={TextField}
                                label="Comfirm Password"
                                name="rePassword"
                                type="password"
                                variant="outlined"
                                error={props.touched.rePassword && Boolean(props.errors.rePassword)}
                                helperText={<ErrorMessage name="rePassword" />}
                            />
                            
                            <Field 
                                control={<Checkbox color="primary" />}
                                label={<Typography variant="body1">I accept the terms and conditions, as well as the privacy policy</Typography>}
                                as={FormControlLabel}
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
                        </DialogActions>
                    </form>
                )}
            </Formik>
            <ActivateAccountDialog open={openActivate} email={email} handleClose={handleCloseActivate} handleCloseSignup={handleClose} />
        </Dialog>
    );
}