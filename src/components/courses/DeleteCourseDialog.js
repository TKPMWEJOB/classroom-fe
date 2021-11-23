import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'

axios.defaults.withCredentials = true;
export default function DeleteCourseButton({ open, setOpen, course, setCourses, courses }) {
  //const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenErrorSnack(false);
  };



  function handleClickLoading() {
    setLoading(true);
  }

  const handleCloseErrorSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnack(false);
  };

  const handleDelete = async (e) => {
    //setOpen(false);
    handleClickLoading();
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${course.id}`);
      setLoading(false);
      const newList = courses.filter((item) => parseInt(item.id) !== parseInt(course.id));
      setCourses(newList);

    } catch (err) {
      console.log(err);
      setSnackMsg(err.response.data.message ? err.response.data.message : "Unknown error");
      setOpenErrorSnack(true);
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
            {course.name} by {course.instructor ? course.instructor : "Anonymous"}
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
      <Snackbar open={openErrorSnack} autoHideDuration={6000} onClose={handleCloseErrorSnack}>
        <MuiAlert
          elevation={6} variant="filled" onClose={handleCloseErrorSnack} severity="error" sx={{ width: '100%' }}
        >
          {snackMsg}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}