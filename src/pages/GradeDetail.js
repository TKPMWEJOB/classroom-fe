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
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { isTeacher, isStudent, isOwner } from '../utils/Role'
import { LinearProgress } from '@mui/material';

export default function GradeDetail() {
  const [value, setValue] = useState('1');
  const [grade, setGrade] = useState(null);
  const [record, setRecord] = useState(null);
  const [course, setCourse] = useState([]);
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

      //console.log(resRecord.data);
      //console.log(resGrade.data);
      //console.log(resCourse.data.data);
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
          <AppBar course={course} role={role} gradeInfor={grade}></AppBar>
          
        </Box>
      </div>
    );
  }
}
