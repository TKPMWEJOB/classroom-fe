import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function TeacherCommentField({ record, setRecord, user }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const { id, gradeId } = useParams();
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const InitialValues = {
    comment: '',
    recordId: record.id
  }

  console.log(record.GradeComments);

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
    .min(1, "Comment must be more than 0 digit")
    .required("You must input your comment")
  });

  const handleSubmit = async(e) => {
    setLoading(true);
    try {
      const newCommentList = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/comment/teacher-comment`, e);
      //console.log(newCommentList.data);
      if (newCommentList.data) {
        setRecord(newCommentList.data);
      }
      handleOpenSuccessSnack(true);
      handleSetMsgSnack("Send Successfully");
    } catch (err) {
      handleOpenErrorSnack(true);
      handleSetMsgSnack(err.response.data.message);
    }
    e.comment="";
    setLoading(false);
  }

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
      <Box>
        {record.GradeComments.length > 0 ? <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3, fontWeight: 'Medium' }}>
          List comment
        </Typography> : ''}
        {record.GradeComments.length > 0 ? <Divider sx={{ mt: 1, background: '#1e88e5' }}/> : ''}
        <List 
          sx={{
            mt: 1,
            mb: -1,
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 270,
            '& ul': { padding: 0 },
          }}>
          {record.GradeComments.map((item) => ( 
            <ListItem> 
              <Box>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                  <Avatar {...stringAvatar(`${item.User.lastName} ${item.User.firstName}`)} />
                    <Typography variant="body1" gutterBottom component="div">
                      {`${item.User.lastName} ${item.User.firstName}`}
                    </Typography>
                  
                  <Typography variant="body2" gutterBottom component="div" sx={{ color: '#757575'}}>
                    {item.createdAt.split('T')[0]}
                  </Typography>
                </Stack>
                <Typography variant="body1" gutterBottom component="div" sx={{ml:6}}>
                  {item.comment}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        
        { record.GradeComments.length > 0 || record.GradeReview?.status === "requesting" ? <Divider sx={{ mt: 2, background: '#1e88e5' }}/> : ""}
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Avatar {...stringAvatar(`${user.lastName} ${user.firstName}`)} sx={{ mt: 1 }}/>
          <Formik initialValues={InitialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(props) => (
            <Form noValidate>
              <Stack direction="row" spacing={0.5}>
                <Field as={TextField}
                  id="comment"
                  name="comment"
                  fullWidth
                  error={props.errors.comment && props.touched.comment}
                  label="Your comment"
                  helperText={<ErrorMessage name='comment' />}
                />  
                <IconButton 
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ height: 54, width: 54 }}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    );
  }
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

