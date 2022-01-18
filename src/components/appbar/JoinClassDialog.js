import { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import * as Yup from "yup"
import { Formik, ErrorMessage, Field, Form } from "formik"
import { SnackbarContext } from '../../contexts/SnackbarContext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

axios.defaults.withCredentials = true;
export default function JoinClassDialog({ open, setOpen }) {
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses/join-by-code`, {
                invitationId: e.target.invitationId.value,
            });
            
            handleSetMsgSnack(res.data.msg);
            handleOpenSuccessSnack(true);
            setLoading(false);
            setTimeout(() => {
                setRedirect(`courses/${res.data.courseId}`);
            }, 1500);
        } catch (err) {
            console.log(err);
            const { response } = err;
            handleSetMsgSnack(response.data.msg ? response.data.msg : "Unknown error");
            handleOpenErrorSnack(true);
            setLoading(false);
        }
    };

    const formik = {
        initialValues: {
            invitationId: "",
        }, 
        validationSchema: Yup.object().shape({
            invitationId: Yup.string()
            .required("Required!")
            .test('len', 'Invalid code', val => val ? val.length === 8 : true)
        })
    };
  
    if (redirect) {
        const redirectURL = `/${redirect}`
        return (<Redirect push to={redirectURL} />)
    }
    else
        return (
            <div>
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
                                <DialogTitle>Join Class</DialogTitle>
                                <DialogContent>
                                    <Field
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="invitationId"
                                        name="invitationId"
                                        label="Invite Code"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{ maxLength: 8}}
                                        as={TextField}
                                        error={props.touched.invitationId && Boolean(props.errors.invitationId)}
                                        helperText={<ErrorMessage name="invitationId" />}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
                                </DialogActions>
                            </form>
                        )}
                    </Formik>
                </Dialog>
            </div>
        );
}
