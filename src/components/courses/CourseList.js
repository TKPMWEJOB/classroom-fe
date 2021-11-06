import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import CreateCourseButton from './CreateCourseButton'
import CourseCard from './CourseCard'
import React from 'react'

function Courses() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        else {
          return res.text().then(text => { throw new Error(text) })
        }
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setCourses(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <CreateCourseButton setCourses={setCourses} setIsLoaded={setIsLoaded} setError={setError} courses={courses}/>
        <Grid container spacing="24px" padding="24px">
          {courses.map((course,index, courses) => (
            <Grid item key={course.id}>
              <CourseCard
                course={course}
                courses={courses}
                setCourses={setCourses} setIsLoaded={setIsLoaded} setError={setError}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Courses;