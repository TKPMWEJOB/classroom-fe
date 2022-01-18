import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import TabContext from '@mui/lab/TabContext';
//import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TabPanel({ value, index, record, grade }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [open, setOpen] = useState(false);
  //const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const [role, setRole] = useState('');
  const { id, gradeId } = useParams();
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  useEffect(async () => {
    try {
      let resStudent = await axios.get(`${process.env.REACT_APP_API_URL}/user/find-user/${record.studentId}`);

      setStudent(resStudent.data);
      //setCourse(resCourse.data.data);

      setIsLoaded(true);

      console.log(resStudent.data);
      //setRole(resCourse.data.role);
      /*setMaxValue(parseInt(resGrade.data.point));

      if (resRecord.data) {
        //Set date string
        setModifiedDate(resRecord.data.publishedDate.split('T')[0]);
      }*/
      
      //console.log("teacher: ", isTeacher(resCourse.data.role));
      //console.log("student: ", isStudent(resCourse.data.role));
      //console.log("owner: ", isOwner(resCourse.data.role));
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, width: 1300 }}>
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

                    <Typography variant="body1" gutterBottom component="div" sx={{ mt: -1.5, fontWeight: 'Medium' }}>
                      { student ? `${student.lastName} ${student.firstName} - ${student.studentId}` 
                      : `${record.studentId}`}
                    </Typography>

                    <Typography variant="body1" gutterBottom component="div">
                      {record.point? `${record.point}/${grade.point}` : `Point unset`}
                    </Typography>

                    <Typography variant="body1" gutterBottom component="div" sx={{ color: '#757575'}}>
                      {record.publish? `Published` : `Unpublish`}
                    </Typography>

            
                    {record.GradeReview.status === "requesting" ? 
                      <>
                        <Divider sx={{ mt: 5, background: '#1e88e5' }}/>

                        <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'Medium', color: '#1e88e5' }}>
                          Review request
                        </Typography>

                        <Typography variant="body2" gutterBottom component="div">
                          {record.GradeReview.explanation}
                        </Typography>

                        <Typography variant="body1" gutterBottom component="div">
                          {`Expectation point: ${record.GradeReview.expectationPoint}`}
                        </Typography>
                      </>
                      : ''
                    }
                    

                    <Divider sx={{ mt: 5, background: '#1e88e5' }}/>

                    <Typography variant="h5" gutterBottom component="div" sx={{ mt: 1, fontWeight: 'Medium' }}>
                      Submissions: Coming soon
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs>
                <Paper elevation={2} sx={{ p: 2 }}> 
                  
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
}