import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuHandleRequestButton from './MenuHandleRequestButton';
import ResolveRequestDialog from './ResolveRequestDialog'
import TeacherCommentField from "../Comment/TeacherComment";

export default function TabPanel({ value, index, record, setRecord, grade, user }) {
  const [student, setStudent] = useState(null);
  const [option, setOption] = useState(-1);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    try {
      let resStudent = await axios.get(`${process.env.REACT_APP_API_URL}/user/find-student/${record.studentId}`);
      setStudent(resStudent.data);
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }, []);

  const handleOpenDialogMenu = (e) => {
    setOption(e.target.value);
    setOpenDialog(true);
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, width: 1300 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={5} sx={{ mt: 1, mb: 1, p: 2 }}>
              <Grid item xs={8}>
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ bgcolor: '#1e88e5' }}>
                    <AssignmentIcon />
                  </Avatar>
                  <Stack sx={{ width: '100%'}}>

                    <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'Medium', color: '#1e88e5' }}>
                      {grade? grade.title : 'Undefined'}
                    </Typography>

                    <Typography variant="body1" gutterBottom component="div" sx={{ mt: -1.5, fontWeight: 'Medium' }}>
                      { student ? `${student.lastName} ${student.firstName} - ${record.studentId}` 
                      : `${record.studentId}`}
                    </Typography>

                    <Typography variant="body1" gutterBottom component="div">
                      {record.point? `${record.point}/${grade.point}` : `Point unset`}
                    </Typography>

                    <Typography variant="body1" gutterBottom component="div" sx={{ color: '#757575'}}>
                      {record?.publish? `Published` : `Unpublish`}
                    </Typography>

            
                    {record.GradeReview?.status === "requesting" ? 
                      <>
                        <Divider sx={{ mt: 5, background: '#1e88e5' }}/>

                        <Typography variant="h4" gutterBottom component="div" sx={{ mt: 1, fontWeight: 'Medium', color: '#1e88e5' }}>
                          Review request
                        </Typography>

                        <Typography variant="body1" gutterBottom component="div">
                          {record.GradeReview.explanation}
                        </Typography>

                        <Typography variant="body1" gutterBottom component="div">
                          {`Expectation point: ${record.GradeReview.expectationPoint}`}
                        </Typography>
                      </>
                      : ''
                    }
                    

                    <Divider sx={{ mt: 5, background: '#1e88e5' }}/>

                    <Typography variant="h5" gutterBottom component="div" sx={{ mt: 1, fontWeight: 'Medium' }}>
                      Submissions: Coming soon
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs>
                <Paper elevation={2} sx={{ p: 2 }}> 
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    {record.GradeReview?.status === "requesting" ?
                      <MenuHandleRequestButton onClick={handleOpenDialogMenu}/>
                      : ""
                    }
                    <TeacherCommentField record={record} setRecord={setRecord} user={user}/>
                  </Stack>
                  
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <ResolveRequestDialog option={option} grade={grade} record={record} setRecord={setRecord} open={openDialog} setOpen={setOpenDialog} />
        </Box>
      )}
    </div>
  );
}