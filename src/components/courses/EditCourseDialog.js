import { useState, useContext } from 'react';
import UpdateCourseDialog from './CreateUpdateCourseForm';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from '../../contexts/SnackbarContext';

axios.defaults.withCredentials = true;
export default function EditButton({ setIsLoaded, open, setOpen, setCourses, setError, course, courses }) {
  const [loading, setLoading] = useState(false);
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const handleClose = () => {
    setOpen(false);
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
      const newList = courses.map((item) => {
        if (parseInt(item.id) === parseInt(res.data.id)) {
          item = res.data;
        }
        return item;
      });
      setIsLoaded(true);
      setCourses(newList);
      setOpen(false);
      setLoading(false);
      handleSetMsgSnack("Classroom updated!");
      handleOpenSuccessSnack(true);
    } catch (err) {
      console.log(err);
      handleSetMsgSnack(err.response.data.message ? err.response.data.message : "Unknown error");
      handleOpenErrorSnack(true);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "12px" }}>
      <UpdateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmitEdit} loading={loading}
        dialogTitle="Update course"
        course={course}
      />
    </div>
  );
}
