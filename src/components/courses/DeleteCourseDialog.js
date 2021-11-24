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
  const [loading, setLoading] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;

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
    handleClickLoading();
    let config = null;
    if (tokenLocal) {
        config = {
            headers: { 'authorization': `${tokenLocal}` }
        };
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${course.id}`, config);
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