import { Grid } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import CourseCard from './CourseCard'
import React from 'react'
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

function Courses() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const { updateUser } = useContext(UserContext);
  
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/`);
      // if (res.status === 200) {
        console.log(res.data[0]);
      setIsLoaded(true);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        updateUser(false, null);
      }
      setIsLoaded(true);
      setError(err);
    }
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* <CreateCourseButton setCourses={setCourses} setError={setError} courses={courses}/> */}
        {
          courses.length === 0 ? <h1 style={styles.textStyle}>You have not join any class yet!</h1> :
          <Grid container spacing="24px" padding="24px">
            {courses.map((course, index, courses) => (
              <Grid item key={course.id}>
                <CourseCard
                  course={course}
                  courses={courses}
                  setIsLoaded={setIsLoaded}
                  setCourses={setCourses} setError={setError}
                />
              </Grid>
            ))}
          </Grid>
        }
      </div>
    );
  }
}

export default Courses;

const styles = {
  textStyle: {
      textAlign: 'center'
  }
};