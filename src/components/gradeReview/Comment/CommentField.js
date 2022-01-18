import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function CommentField({ comment, setComment, user, course }) {
  const [loading, setLoading] = React.useState(false);
  const [maxValue, setMaxValue] = useState(0);
  //const [grade, setGrade] = useState(null);
  //const [record, setRecord] = useState(null);
  //const [course, setCourse] = useState([]);
  const [modifiedDate, setModifiedDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
  const [role, setRole] = useState('');
  const { id, gradeId } = useParams();
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const InitialValues = {
    comment: ''
  }

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
    .min(1, "Comment must be more than 0 digit")
    .required("You must input your comment")
  });

  const handleSubmit = async(e) => {
    setLoading(true);
    try {
      const newCommentList = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/${gradeId}/comment/student-comment`, e);
      if (newCommentList.data) {
        setComment(newCommentList.data);
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
        {comment.length > 0 ? <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3, fontWeight: 'Medium' }}>
          List comment
        </Typography> : ''}
        {comment.length > 0 ? <Divider sx={{ mt: 1, background: '#1e88e5' }}/> : ''}
        <List sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}>
          {comment.map((item) => ( 
            <ListItem> 
              <Box>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                  {item.senderId===user.id ? 
                    <>
                      <Avatar {...stringAvatar(`${user.lastName} ${user.firstName}`)} />
                      <Typography variant="body1" gutterBottom component="div">
                        {`${user.lastName} ${user.firstName}`}
                      </Typography>
                    </>
                    : <>
                      <Avatar {...stringAvatar(`${course.owner.lastName} ${course.owner.firstName}`)} />
                      <Typography variant="body1" gutterBottom component="div">
                        {`${course.owner.lastName} ${course.owner.firstName}`}
                      </Typography>
                    </>
                  }
                  
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
        
        <Divider sx={{ mt: 2, background: '#1e88e5' }}/>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Avatar {...stringAvatar(`${user.lastName} ${user.firstName}`)} />
          <Formik initialValues={InitialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {(props) => (
            <Form noValidate>
              <Stack direction="row" spacing={2}>
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

