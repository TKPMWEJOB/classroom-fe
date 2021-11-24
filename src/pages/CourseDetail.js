import AppBar from '../components/courses/detail/DetailAppBar';
import Stream from '../components/courses/detail/Stream';
import People from '../components/courses/detail/People';
import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
export default function CourseDetail() {
  const [value, setValue] = React.useState('1');
  const [course, setCourse] = React.useState([]);
  const [role, setRole] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <AppBar handleChangeTab={handleChange} course={course}></AppBar>

          <TabPanel value="1" style={{ padding: 0 }}>
            <Stream
              course={course}
              setCourse={setCourse}
              role={role}
              setRole={setRole}
            >
            </Stream>
          </TabPanel>
          <TabPanel value="2">
          </TabPanel>
          <TabPanel value="3">
            <People
              role={role}
              setRole={setRole}>
            </People>
          </TabPanel>
        </TabContext>
      </Box>



    </div>
  );
}
