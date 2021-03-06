import * as React from 'react';
import { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function StudentGradeDetail({ option, grade, open, setOpen, record, setRecord }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const { id, gradeId } = useParams();
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const op0InitialValues = {
    recordId: record.id,
    studentId: record.studentId,
    resolveComment: '',
    point: ''
  }

  const op1InitialValues = {
    recordId: record.id,
    studentId: record.studentId,
    resolveComment: ''
  }

  const validationSchema = Yup.object().shape({
    point: Yup.number()
    .min(0, "Must be more than 0")
    .max(grade.point, `Max point is ${grade.point}`)
    .required("Your new point is requried")
  }); 
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    setLoading(true);
    if (option === 0) {
      try {
        const resRecord = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/accept-review`, e);
        
        setRecord(resRecord.data);
        
        handleOpenSuccessSnack(true);
        handleSetMsgSnack("Send Successfully");
      } catch (err) {
          handleOpenErrorSnack(true);
          handleSetMsgSnack(err.response.data.message);
      }
    }
    else if (option === 1) {
      try {
        const resRecord = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/reject-review`, e);
        setRecord(resRecord.data);
        handleOpenSuccessSnack(true);
        handleSetMsgSnack("Send Successfully");
      } catch (err) {
          handleOpenErrorSnack(true);
          handleSetMsgSnack(err.response.data.message);
      }
    }
    
    setOpen(false);
    setLoading(false);
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  } else {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          {option === 0 ?
            <>
              <DialogTitle>Accept request</DialogTitle>
              <DialogContent>
                <Formik initialValues={op0InitialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {(props) => (
                  <Form noValidate>
                    <Grid container spacing={2} sx={{ mt: -1.5}}>
                      <Grid item xs={12}>
                          <Field as={TextField}
                          id="resolveComment"
                          name="resolveComment"
                          fullWidth
                          multiline
                          rows={3}
                          label="Your comment"
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Field as={TextField}
                          required
                          id="point"
                          name="point"
                          fullWidth
                          error={props.errors.point && props.touched.point}
                          label="New point"
                          autoComplete="point"
                          helperText={<ErrorMessage name='point' />}
                          />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Box sx={{ mt: 1 }}>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <LoadingButton
                          loading={loading}
                          type="submit"
                          variant="contained"
                          color="primary"
                          endIcon={<SendIcon />}
                          sx={{ ml: 2 }}
                        >
                          Send
                        </LoadingButton>
                      </Box>
                    </DialogActions>
                  </Form>
                  )}
                </Formik>
              </DialogContent>
            </>
            : <>
              <DialogTitle>Reject request</DialogTitle>
              <DialogContent>
                <Formik initialValues={op1InitialValues} onSubmit={handleSubmit}>
                  {(props) => (
                  <Form noValidate>
                    <Grid container spacing={2} sx={{ mt: -1.5}}>
                      <Grid item xs={12}>
                          <Field as={TextField}
                          id="resolveComment"
                          name="resolveComment"
                          fullWidth
                          multiline
                          rows={3}
                          label="Your comment"
                          sx={{width: 400}}
                          />
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Box sx={{ mt: 1 }}>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <LoadingButton
                          loading={loading}
                          type="submit"
                          variant="contained"
                          color="primary"
                          endIcon={<SendIcon />}
                          sx={{ ml: 2 }}
                        >
                          Send
                        </LoadingButton>
                      </Box>
                    </DialogActions>
                  </Form>
                  )}
                </Formik>
              </DialogContent>
            </>
          }
        </Dialog>
      </div>
    );
  }
}
