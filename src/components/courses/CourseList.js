import { Grid } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import CourseCard from './CourseCard'
import React from 'react'
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

function Courses() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState([]);
  const { userInfo, updateUser } = useContext(UserContext);
  
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(async () => {
    /*let config = null;
    if (tokenLocal) {
        config = {
            headers: { 'authorization': `${tokenLocal}` }
        };
    }*/
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/`);
    if (res.status === 200) {
      setIsLoaded(true);
      setCourses(res.data);
    } else {
      console.log(res);
      updateUser(false, null);
      setIsLoaded(true);
      setError(res.error);
    }

    /*
    fetch(`${process.env.REACT_APP_API_URL}/courses/`, {
      headers: {
        "authorization": cookies.token,
      }
    })
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
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
      */
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* <CreateCourseButton setCourses={setCourses} setError={setError} courses={courses}/> */}
        <Grid container spacing="24px" padding="24px">
          {courses.map((course,index, courses) => (
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
      </div>
    );
  }
}

export default Courses;