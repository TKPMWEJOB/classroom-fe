import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'

import { SnackbarContext } from '../../contexts/SnackbarContext';

axios.defaults.withCredentials = true;
export default function DeleteCourseButton({ open, setOpen, course, setCourses, courses }) {
  const [loading, setLoading] = useState(false);
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

  const handleClose = () => {
    setOpen(false);
    handleOpenErrorSnack(false);
  };

  function handleClickLoading() {
    setLoading(true);
  }

  const handleDelete = async (e) => {
    handleClickLoading();

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${course.id}`);
      setLoading(false);
      const newList = courses.filter((item) => parseInt(item.id) !== parseInt(course.id));
      setCourses(newList);
      handleSetMsgSnack("Classroom deleted!");
      handleOpenSuccessSnack(true);
    } catch (err) {
      console.log(err);
      handleSetMsgSnack(err.response.data.message ? err.response.data.message : "Unknown error");
      handleOpenErrorSnack(true);
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this course?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Course: {course.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleDelete} color="error"
            loading={loading}
          >
            Delete
          </LoadingButton>

          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}