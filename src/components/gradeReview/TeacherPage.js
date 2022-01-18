import AppBar from './AppBar/StudentAppBar';
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
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import TabContext from '@mui/lab/TabContext';
//import TabPanel from '@mui/lab/TabPanel';
import TabPanel from './TabPanel/StudentPanel';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TeacherGradeDetail({course}) {
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    try {
      //let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      let resRecord = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/all`);
      let resGrade = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/${gradeId}`);

      
      setRecord(resRecord.data);
      setGrade(resGrade.data);
      //setCourse(resCourse.data.data);

      setIsLoaded(true);
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

  /*const initialValues = {
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
  }*/


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
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs student"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {record.map((item) => ( 
                <Tab label={`Student ${item.studentId}`} {...a11yProps(item.id)} sx={{height: 60}} />
              ))}
            </Tabs>

            {record.map((item, index) => ( 
              <TabPanel value={value} index={index} record={item} grade={grade}></TabPanel>
            ))}
          </Box>
          
        </Box>
      </div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}