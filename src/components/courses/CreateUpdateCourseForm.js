import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function FormDialog({ open, dialogTitle, handleClose, handleSubmit, course }) {
  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
      <form action="/" method="POST" onSubmit={(e) => handleClose}>

        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            id="course"
            label="Course's name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={course ? course.name : ""}
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            margin="dense"
            id="instructor"
            label="Instructor's name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={course ? course.instructor : ""}
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            margin="dense"
            id="description"
            label="description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            defaultValue={course ? course.description : ""}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
