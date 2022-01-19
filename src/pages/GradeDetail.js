import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import StudentPage from '../components/gradeReview/StudentPage';
import TeacherPage from '../components/gradeReview/TeacherPage';

export default function GradeDetail() {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState('');
  const { id } = useParams();
  
  useEffect(async () => {
    try {
      let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      setCourse(resCourse.data.data);

      setIsLoaded(true);
      setRole(resCourse.data.role);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);


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
          {
            role === 'student' ?
            <StudentPage course={course} ></StudentPage>
            : <TeacherPage course={course} ></TeacherPage>
          }
        </Box>
      </div>
    );
  }
}
