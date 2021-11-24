import { useState } from 'react';
import CreateCourseDialog from './CreateUpdateCourseForm';
import { Redirect } from 'react-router';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

axios.defaults.withCredentials = true;
export default function CreateButton({ open, setOpen }) {
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
    setOpenErrorSnack(false);
  };

  const handleCloseErrorSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorSnack(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses/`, {
        name: e.target.course.value,
        section: e.target.section.value,
        subject: e.target.subject.value,
        room: e.target.room.value
      });
      setRedirect(`courses/${res.data.id}`);
      setLoading(false);
    } catch (err) {
      setSnackMsg(err.response.data.message ? err.response.data.message : "Unknown error");
      setOpenErrorSnack(true);
      setLoading(false);
    }
  };
  
  if (redirect) {
    const redirectURL = `/${redirect}`
    return (<Redirect push to={redirectURL} />)
  }
  else
    return (
      <div>
        <CreateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} loading={loading}
          dialogTitle="Create course"
        />
        <Snackbar open={openErrorSnack} autoHideDuration={6000} onClose={handleCloseErrorSnack}>
          <MuiAlert
            elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }}
          >
            {snackMsg}
          </MuiAlert>
        </Snackbar>
      </div>
    );
}
