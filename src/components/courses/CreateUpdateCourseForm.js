import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FormDialog({ open, dialogTitle, handleClose, handleSubmit, course, loading }) {
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
            id="section"
            label="Section"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={course ? course.section : ""}
            inputProps={{ maxLength: 50 }}
          />

          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
            multiline
            defaultValue={course ? course.subject : ""}
          />

          <TextField
            margin="dense"
            id="room"
            label="Room"
            type="text"
            fullWidth
            variant="standard"
            multiline
            defaultValue={course ? course.room : ""}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton type="submit" loading={loading}>Submit</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
