import AppBar from '../components/courses/detail/DetailAppBar';
import Stream from '../components/courses/detail/Stream';
import People from '../components/courses/detail/People';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

export default function CourseDetail() {
  const [value, setValue] = React.useState('1');
  const [course, setCourse] = React.useState([]);
  const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const { id } = useParams();

  useEffect( async () => {
		try {
			let config = null;
			if (tokenLocal) {
				config = {
					headers: { 'authorization': `${tokenLocal}` }
				};
			}
			let result = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`, config);
			setIsLoaded(true);
			console.log(result);
			setCourse(result.data);
		} catch(error) {
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
		return <div>Loading...</div>;
	} else {
  return (
      <div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <AppBar handleChangeTab={handleChange} course={course}></AppBar>

            <TabPanel value="1" style={{ padding: 0 }}>
              <Stream course={course} setCourse={setCourse}></Stream>
            </TabPanel>
            <TabPanel value="2">
            </TabPanel>
            <TabPanel value="3">
              <People course={course} setCourse={setCourse}></People>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    );
  }
}
