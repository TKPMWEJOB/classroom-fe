import AppBar from './AppBar/StudentAppBar';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
//import { isTeacher, isStudent, isOwner } from '../utils/Role'
import { LinearProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function StudentGradeDetail({course}) {
  const [loading, setLoading] = React.useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState(null);
  const [record, setRecord] = useState(null);
  //const [course, setCourse] = useState([]);
  const [modifiedDate, setModifiedDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const [role, setRole] = useState('');
  const { id, gradeId } = useParams();
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);
  
  useEffect(async () => {
    try {
      //let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      let resRecord = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/student`);
      let resGrade = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/${gradeId}`);

      
      setRecord(resRecord.data);
      setGrade(resGrade.data);
      //setCourse(resCourse.data.data);

      setIsLoaded(true);
      //setRole(resCourse.data.role);
      setMaxValue(parseInt(resGrade.data.point));

      if (resRecord.data) {
        //Set date string
        setModifiedDate(resRecord.data.publishedDate.split('T')[0]);
      }
      
      //console.log("teacher: ", isTeacher(resCourse.data.role));
      //console.log("student: ", isStudent(resCourse.data.role));
      //console.log("owner: ", isOwner(resCourse.data.role));
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);

  const initialValues = {
    explanation: '',
    expectationPoint: ''
  }

  const validationSchema = Yup.object().shape({
    expectationPoint:Yup.number()
    .min(0, "Must be more than 0")
    .max(maxValue, `Your max point is ${maxValue}`)
    .required("Your expectation point is requried")
  }); 
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/request-review`, e);
      handleOpenSuccessSnack(true);
      handleSetMsgSnack("Send Successfully");
    } catch (err) {
        handleOpenErrorSnack(true);
        handleSetMsgSnack(err.response.data.message);
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
        <Box sx={{ width: '100%' }}>
          <AppBar course={course} role={role}></AppBar>
          <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={5} sx={{ mt: 1, mb: 1, p: 2 }}>
                <Grid item xs={9}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: '#1e88e5' }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Stack sx={{ width: '100%'}}>
                      <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'Medium', color: '#1e88e5' }}>
                        {grade? grade.title : 'Undefined'}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div" sx={{ mt: -1.5, color: '#757575'}}>
                        {course? 
                          modifiedDate? `By ${course.owner.lastName} ${course.owner.firstName} At ${modifiedDate}` 
                            : `By ${course.owner.lastName} ${course.owner.firstName}`
                            : 'Undefined'}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div">
                        {record? `${record.point}/${grade.point}` : `Unpublished`}
                      </Typography>
                      <Divider sx={{ mt: 1, background: '#1e88e5' }}/>
                      <Typography variant="h5" gutterBottom component="div" sx={{ mt: 1, fontWeight: 'Medium' }}>
                        Your submissions: Coming soon
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs>
                  <Paper elevation={2} sx={{ p: 2 }}> 
                    <Box> 
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        { record ? 
                        <Button onClick={handleClickOpen} variant="contained" startIcon={<RateReviewIcon />}>
                          Request a review
                        </Button>
                        : "" }
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
          { record ? 
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Request a review</DialogTitle>
            <DialogContent>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(props) => (
                <Form noValidate>
                  <Grid container spacing={2} sx={{ mt: -1.5}}>
                    <Grid item xs={12}>
                        <Field as={TextField}
                        id="explanation"
                        name="explanation"
                        fullWidth
                        multiline
                        rows={3}
                        label="Your explanation"
                        autoComplete="explanation"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field as={TextField}
                        required
                        id="expectationPoint"
                        name="expectationPoint"
                        fullWidth
                        error={props.errors.expectationPoint && props.touched.expectationPoint}
                        label="Expectation Point"
                        autoComplete="expectationPoint"
                        helperText={<ErrorMessage name='expectationPoint' />}
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
          </Dialog>
          : "" }
        </Box>
      </div>
    );
  }
}