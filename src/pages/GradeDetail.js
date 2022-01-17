import AppBar from '../components/courses/detail/GradeDetail/GradeDetailAppBar';
import Stream from '../components/courses/detail/Stream';
import People from '../components/courses/detail/People';
import GradeList from '../components/courses/grading/GradeList';
import StudentGrades from '../components/courses/studentRecords/StudentGrades';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { isTeacher, isStudent, isOwner } from '../utils/Role'
import { LinearProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

export default function GradeDetail() {
  const [value, setValue] = useState('1');
  const [grade, setGrade] = useState(null);
  const [record, setRecord] = useState(null);
  const [course, setCourse] = useState([]);
  const [modifiedDate, setModifiedDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const [role, setRole] = useState('');
  const { id, gradeId } = useParams();

  useEffect(async () => {
    try {
      let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      let resRecord = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}`);
      let resGrade = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/${gradeId}`);

      
      setRecord(resRecord.data);
      setGrade(resGrade.data);
      setCourse(resCourse.data.data);

      setIsLoaded(true);
      setRole(resCourse.data.role);

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
  }, [id])


  /*const handleChange = (event, newValue) => {
    setValue(newValue);
  };*/

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
                <Grid item xs={8}>
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
                        
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </div>
    );
  }
}
