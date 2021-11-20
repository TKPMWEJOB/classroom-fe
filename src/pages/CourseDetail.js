import AppBar from '../components/courses/detail/DetailAppBar'
import Content from '../components/courses/detail/Content'
import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
export default function CourseDetail() {
  const [value, setValue] = React.useState('1');
  const [course, setCourse] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <AppBar handleChangeTab={handleChange} course={course}></AppBar>

          <TabPanel value="1" style={{ padding: 0 }}>
            <Content course={course} setCourse={setCourse}></Content>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>



    </div>
  );
}
