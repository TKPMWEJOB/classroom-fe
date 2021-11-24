import { useState } from 'react';
import UpdateCourseDialog from './CreateUpdateCourseForm';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

axios.defaults.withCredentials = true;
export default function EditButton({ setIsLoaded, open, setOpen, setCourses, setError, course, courses }) {
  const [loading, setLoading] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseErrorSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorSnack(false);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/courses/${course.id}`, {
        name: e.target.course.value,
        section: e.target.section.value,
        subject: e.target.subject.value,
        room: e.target.room.value
      });
      console.log(res.data.data.id);

      const newList = courses.map((item) => {
        if (parseInt(item.id) === parseInt(res.data.data.id)) {
          item = res.data.data;
        }
        return item;
      });
      setIsLoaded(true);
      setCourses(newList);
      setOpen(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setSnackMsg(err.response.data.message ? err.response.data.message : "Unknown error");
      setOpenErrorSnack(true);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "12px" }}>
      <UpdateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmitEdit} loading={loading}
        dialogTitle="Update course"
        course={course}
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
