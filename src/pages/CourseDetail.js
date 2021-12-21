import AppBar from '../components/courses/detail/DetailAppBar';
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

export default function CourseDetail() {
  const [value, setValue] = useState('1');
  const [gradeStructure, setGradeStructure] = useState([]);
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const [role, setRole] = useState('');
  const { id } = useParams();

  useEffect(async () => {
    try {
      let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      let resGrades = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure`);
      setGradeStructure(resGrades.data);
      setCourse(resCourse.data.data);

      setIsLoaded(true);
      setRole(resCourse.data.role);
      console.log("teacher: ", isTeacher(resCourse.data.role));
      console.log("student: ", isStudent(resCourse.data.role));
      console.log("owner: ", isOwner(resCourse.data.role));
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, [id])




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <AppBar handleChangeTab={handleChange} course={course} role={role}></AppBar>

            <TabPanel value="1" style={{ padding: 0 }}>
              <Stream
                course={course}
                setCourse={setCourse}
                role={role}
                setRole={setRole}
                gradeStructure={gradeStructure} />
            </TabPanel>
            <TabPanel value="2">
              Comming Soon
            </TabPanel>
            <TabPanel value="3">
              <People
                course={course}
                setCourse={setCourse}
                role={role}
                setRole={setRole}>
              </People>
            </TabPanel>
            <TabPanel value="4">
              <GradeList
                gradeStructure={gradeStructure}
                setGradeStructure={setGradeStructure} />
            </TabPanel>
            <TabPanel value="5">
              <StudentGrades
                gradeStructure={gradeStructure}
                setGradeStructure={setGradeStructure} 
                role={role}/>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    );
  }
}
