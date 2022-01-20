import AppBar from './AppBar/StudentAppBar';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import Badge from '@mui/material/Badge';

import TabPanel from './TabPanel/StudentPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TeacherGradeDetail({course}) {
  const [user, setUser] = useState({});
  const [grade, setGrade] = useState([]);
  const [record, setRecord] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState('');
  const { id, gradeId } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    try {
      //let resCourse = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`);
      let resRecord = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/all`);
      let resGrade = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/${gradeId}`);
      let resUser = await axios.get(`${process.env.REACT_APP_API_URL}/user`);

      
      setRecord(resRecord.data);
      setGrade(resGrade.data);
      setUser(resUser.data);
      // console.log(resUser.data);
      // console.log(resRecord.data);
      // console.log(resGrade.data);


      setIsLoaded(true);

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
          <AppBar course={course} role={role}></AppBar>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs student"
              sx={{ borderRight: 1, borderColor: 'divider', width: 200 }}
            >
              {record.map((item) => ( 
                item.GradeReview?.status === "requesting" ?
                  <Tab label= {<Badge badgeContent=" " color="primary">
                    <Box sx={{ ml: 2, mr: 2 }}>
                        {`${item.studentId}`}
                    </Box>
                  </Badge>} {...a11yProps(item.id)} sx={{height: 60}} 
                  />
                : <Tab label={`${item.studentId}`} {...a11yProps(item.id)} sx={{height: 60}} />
              ))}
            </Tabs>

            {record.map((item, index) => ( 
              <TabPanel value={value} index={index} record={item} setRecord={setRecord} grade={grade} user={user}></TabPanel>
            ))}
          </Box>
          
        </Box>
      </div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}