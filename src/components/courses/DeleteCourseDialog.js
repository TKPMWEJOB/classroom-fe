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

  const handleDelete = (e) => {
    //setOpen(false);
    handleClickLoading();
    fetch(`${process.env.REACT_APP_API_URL}/courses/${course.id}`, {
      method: 'DELETE',
      accept: '*/*',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token.jwtToken,
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        return res.text().then(text => { throw new Error(text) })
      }
    })
      .then(
        (result) => {
          setSnackMsg("Deleted ");
          setLoading(false);
          const newList = courses.filter((item) => parseInt(item.id) !== parseInt(course.id));
          setCourses(newList);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          //setIsLoaded(true);
          console.log(error);
          setSnackMsg(JSON.parse(error.message).message);
          setOpenErrorSnack(true);
          setLoading(false);
          setOpen(false);
        }
      );
  }

  return (
    <div>
      {/* <IconButton aria-label="delete" onClick={handleClickDelete}>
        <DeleteIcon />
      </IconButton> */}
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