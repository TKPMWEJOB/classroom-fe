import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteCourseButton({ course, setIsLoaded, setCourses, setError, courses }) {
  const [open, setOpen] = React.useState(false);

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (e) => {
    setOpen(false);
    fetch(`${process.env.REACT_APP_API_URL}/courses/${course.id}`, {
      method: 'DELETE',
      accept: '*/*',
      headers: {
        'Content-Type': 'application/json'
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
          const newList = courses.filter((item) => parseInt(item.id) !== parseInt(course.id));
          setIsLoaded(true);
          setCourses(newList);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickDelete}>
        <DeleteIcon />
      </IconButton>
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
          <Button onClick={handleDelete} color="error">Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}